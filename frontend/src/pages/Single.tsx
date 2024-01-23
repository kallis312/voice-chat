import BottomBar from '@/components/BottomBar';
import Chat from '@/components/Chat';
import VideoCard from '@/components/Video';
import { socket } from "@/context/socket";
import { Box, HStack, VStack } from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'simple-peer';

// interface User {
//   userName: string
//   video: boolean
//   audio: boolean
// }

// let peers: {
//   [key: string]: Peer.Instance
// }

interface PeersRef {
  peerID: string
  peer: Peer.Instance
  userId: string
}
const currentUser = (Math.random() * 10000000).toFixed(0)
const roomId = 123

let tempPeers: PeersRef[] = []
let myStream: MediaStream

console.log('userId: ', currentUser)

const configuration = {
  // Using From https://www.metered.ca/tools/openrelay/
  "iceServers": [
    {
      urls: "stun:openrelay.metered.ca:80"
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject"
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject"
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject"
    }
  ]
}

const constraints = {
  audio: true,
  video: {
    width: 640,
    height: 480,
    displaySurface: 'window'
  }
}

let ps: { [key: string]: Peer.Instance } = []

const Room = () => {
  const navigate = useNavigate()
  const [userVideoAudio, setUserVideoAudio] = useState<{ [key: string]: { video: boolean, audio: boolean } }>({
    localUser: { video: true, audio: true },
  });
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [displayChat, setDisplayChat] = useState<boolean>(false);
  const [screenShare, setScreenShare] = useState<boolean>(false);
  const [showVideoDevices, setShowVideoDevices] = useState<boolean>(false);
  const [peers, setPeers] = useState<{ [key: string]: Peer.Instance }>({});
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const screenTrackRef = useRef<MediaStreamTrack>()
  const userStream = useRef<MediaStream>()
  const peersRef = useRef<PeersRef[]>([])

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === 'videoinput');
      setVideoDevices(filtered);
    });

    // Set Back Button Event
    window.addEventListener('popstate', goToBack);
    console.log('SockeId: ', socket.id)
    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        userVideoRef.current!.srcObject = stream;
        userStream.current = stream;
        socket.emit('c2s-join', { roomId, userId: currentUser })
        socket.on('s2c-receive', ({ socketId }: { socketId: string }) => {
          console.log('Reived: ' + socketId)
          addPeer({ socketId, stream, initiator: true })
          // socket.emit('c2s-init', { socketId })
        })
        // socket.emit('c2s-init', { roomId, userId: currentUser })
        // socket.on('s2c-join', ({ socketId, userId }: { socketId: string, userId: string }) => {
        //   console.log('Join :', { socketId, userId })
        //   const peer = addPeer({ socketId, stream, initiator: false })
        //   setPeers(prev => ({ ...prev, [socketId]: peer }))
        // })
        socket.on('s2c-init', ({ socketId }: { socketId: string }) => {
          addPeer({ socketId, initiator: false, stream })
          console.log('Join Add Peer:' + socketId)
        })
        socket.on('s2c-signal', ({ signal, from }: { signal: Peer.SignalData, from: string }) => {
          console.log('Signal recieved: ', { from, signal })
          if (!ps[from])
            addPeer({ socketId: from, stream, initiator: false })
          ps[from].signal(signal)
        })
      })
      .catch(() => {
        navigator.mediaDevices
          .getDisplayMedia(constraints)
          .then((stream) => {
            userVideoRef.current!.srcObject = stream;
            userStream.current = stream;
            socket.emit('c2s-join', { roomId, userId: currentUser })
            socket.on('s2c-receive', ({ socketId }: { socketId: string }) => {
              console.log('Reived: ' + socketId)
              addPeer({ socketId, stream, initiator: true })
              // socket.emit('c2s-init', { socketId })
            })
            // socket.emit('c2s-init', { roomId, userId: currentUser })
            // socket.on('s2c-join', ({ socketId, userId }: { socketId: string, userId: string }) => {
            //   console.log('Join :', { socketId, userId })
            //   const peer = addPeer({ socketId, stream, initiator: false })
            //   setPeers(prev => ({ ...prev, [socketId]: peer }))
            // })
            socket.on('s2c-init', ({ socketId }: { socketId: string }) => {
              addPeer({ socketId, initiator: false, stream })
              console.log('Join Add Peer:' + socketId)
            })
            socket.on('s2c-signal', ({ signal, from }: { signal: Peer.SignalData, from: string }) => {
              console.log('Signal recieved: ', { from, signal })
              if (!ps[from])
                addPeer({ socketId: from, stream, initiator: false })
              ps[from].signal(signal)
            })
          })
      })



    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  const addPeer = ({ socketId, initiator, stream }: { socketId: string | undefined, initiator: boolean, stream: MediaStream | undefined }): void => {
    if (socketId) {
      ps[socketId] = new Peer({
        initiator,
        trickle: false,
        stream,
        config: configuration
      })
      ps[socketId].on('connect', () => {
        console.log('Peer connected:', socketId)
      })
      ps[socketId].on('close', () => {
        ps[socketId].destroy()
      })
      console.log('Adding peer : ', { socketId })
      ps[socketId].on('signal', (data: Peer.SignalData) => {
        console.log('Signal : ', { socketId, initiator, data, stream })
        socket.emit('c2s-signal', { signal: data, to: socketId })
      })
      ps[socketId].on('stream', (data: MediaStream) => {
        console.log('Received Stream : ', { data })
        const vidoes = document.getElementById('videos')
        const newVid = document.createElement('video')
        newVid.srcObject = data!
        newVid.id = socketId
        newVid.width = 400
        newVid.onclick = expandScreen
        newVid.height = 300
        newVid.autoplay = true
        vidoes?.appendChild(newVid)
      })

      setPeers(ps)
    }
  }

  // function createPeer(userId: string, caller: string | undefined, stream: MediaStream | undefined): Peer.Instance {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on('signal', (signal) => {
  //     socket.emit('BE-call-user', {
  //       userToCall: userId,
  //       from: caller,
  //       signal,
  //     });
  //   });
  //   peer.on('disconnect', () => {
  //     peer.destroy();
  //   });

  //   return peer;
  // }

  // function addPeer(incomingSignal: Peer.SignalData, callerId: string, stream: MediaStream | undefined): Peer.Instance {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on('signal', (signal) => {
  //     socket.emit('BE-accept-call', { signal, to: callerId });
  //   });

  //   peer.on('disconnect', () => {
  //     peer.destroy();
  //   });

  //   peer.signal(incomingSignal);

  //   return peer;
  // }

  // function findPeer(id: string): PeersRef | undefined {
  //   return peersRef.current.find((p) => p.peerID === id);
  // }

  function createUserVideo(peer: Peer.Instance) {
    return (
      <Box
        key={Math.random()}
        onClick={expandScreen}
      >
        <VideoCard peer={peer} />
      </Box>
    );
  }


  // function writeUserName(userName, index) {
  //   if (userVideoAudio.hasOwnProperty(userName)) {
  //     if (!userVideoAudio[userName].video) {
  //       return <UserName key={userName}>{userName}</UserName>;
  //     }
  //   }
  // }

  // Open Chat
  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

  // BackButton
  const goToBack = (e) => {
    e.preventDefault();
    socket.emit('BE-leave-room', { roomId, leaver: currentUser });
    sessionStorage.removeItem('user');
    navigate('/call')
  };

  const toggleCameraAudio = (e) => {
    // const target = e.target.getAttribute('data-switch');

    // setUserVideoAudio((preList) => {
    //   let videoSwitch = preList['localUser'].video;
    //   let audioSwitch = preList['localUser'].audio;

    //   if (target === 'video') {
    //     const userVideoTrack = userVideoRef.current!.srcObject.getVideoTracks()[0];
    //     videoSwitch = !videoSwitch;
    //     userVideoTrack.enabled = videoSwitch;
    //   } else {
    //     const userAudioTrack = userVideoRef.current.srcObject.getAudioTracks()[0];
    //     audioSwitch = !audioSwitch;

    //     if (userAudioTrack) {
    //       userAudioTrack.enabled = audioSwitch;
    //     } else {
    //       userStream.current.getAudioTracks()[0].enabled = audioSwitch;
    //     }
    //   }

    //   return {
    //     ...preList,
    //     localUser: { video: videoSwitch, audio: audioSwitch },
    //   };
    // });

    // socket.emit('BE-toggle-camera-audio', { roomId, switchTarget: target });
  };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia()
        .then((cameraStream) => {
          console.log(cameraStream.getVideoTracks())
          const screenTrack = cameraStream.getVideoTracks()[0];

          // peersRef.current.forEach(({ peer }) => {
          //   peer.addStream(cameraStream)
          //   // peer.addTrack(screenTrack, cameraStream)
          //   // peer.replaceTrack(localStream.current!.getVideoTracks()[0], screenTrack, localStream.current!)
          //   // peer.removeStream(stream!)
          //   // peer.addStream(cameraStream!)
          // });
          peers.forEach(peer => {
            peer.replaceTrack(localStream.current!.getVideoTracks()[0], screenTrack, localStream.current!)
          })

          // Listen click end
          screenTrack.onended = () => {
            peers.forEach(({ peer }) => {
              peer.replaceTrack(screenTrack, localStream.current!.getVideoTracks()[0], localStream.current!)
            });
            userVideoRef.current!.srcObject = localStream.current!;
            setScreenShare(false);
          };

          userVideoRef.current!.srcObject = cameraStream!;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      localStream.current?.getTracks()[0].stop();
    }
  };

  const expandScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const clickBackground = () => {
    if (!showVideoDevices) return;

    setShowVideoDevices(false);
  };

  const clickCameraDevice = () => {
    // if (event && event.target && event.target?.dataset && event.target.dataset.value) {
    //   const deviceId = event.target.dataset.value;
    //   const enabledAudio = userVideoRef.current!.srcObject?.getAudioTracks()[0].enabled;

    //   navigator.mediaDevices
    //     .getUserMedia({ video: { deviceId }, audio: enabledAudio })
    //     .then((cameraStream) => {
    //       const userStream = stream as MediaStream
    //       const newStreamTrack = cameraStream.getTracks().find((track) => track.kind === 'video');
    //       const oldStreamTrack = userStream
    //         .getTracks()
    //         .find((track) => track.kind === 'video');

    //       userStream.removeTrack(oldStreamTrack!);
    //       userStream.addTrack(newStreamTrack!);

    //       peersRef.current.forEach(({ peer }: { peer: Peer.Instance }) => {
    //         // replaceTrack (oldTrack, newTrack, oldStream);
    //         peer.replaceTrack(
    //           oldStreamTrack!,
    //           newStreamTrack!,
    //           screenStream
    //         );
    //       });
    //     });
    // }
  };

  return (
    <HStack w={'full'} h={'full'} gap={0} onClick={clickBackground}>
      <VStack h={'full'} w={'full'} gap={0}>
        <HStack p={4} id='videos' overflow={'auto'} h={'full'} w={'full'} alignItems={'start'} align={'start'} wrap={'wrap'} justify={'center'}>
          <video
            onClick={expandScreen}
            ref={userVideoRef}
            width={400}
            height={300}
            muted
            autoPlay
            className='border'
          ></video>
          {/* Joined User Vidoe */}
          {/* {Object.keys(peers).map((key) => createUserVideo(peers[key]))} */}
          {/* {Object.keys(peers).map((key) => <Box key={key} ><video
            width={300}
            height={200} id={key} autoPlay /></Box>)} */}
        </HStack>
        <BottomBar
          clickScreenSharing={clickScreenSharing}
          clickChat={clickChat}
          clickCameraDevice={clickCameraDevice}
          goToBack={goToBack}
          toggleCameraAudio={toggleCameraAudio}
          userVideoAudio={userVideoAudio['localUser']}
          screenShare={screenShare}
          videoDevices={videoDevices}
          showVideoDevices={showVideoDevices}
          setShowVideoDevices={setShowVideoDevices}
        />
      </VStack>
      <Chat display={displayChat} roomId={roomId} />
    </HStack>
  );
};

export default Room;