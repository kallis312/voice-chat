import { SocketContext } from "@/context/socket"
import { AbsoluteCenter, Avatar, Box, Center, Divider, HStack, IconButton, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, VStack } from "@chakra-ui/react"
import { ArrowUturnRightIcon, MicrophoneIcon, PhoneXMarkIcon, SpeakerWaveIcon, Squares2X2Icon, VideoCameraIcon } from "@heroicons/react/24/solid"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Peer, { SignalData, SimplePeer } from "simple-peer"

type Props = {}

const storageToken = localStorage.getItem('token')
const userInfo = localStorage.getItem('user') as string
const { _id: userId } = JSON.parse(userInfo) as { _id: string, email: string }

const CallRoom = (props: Props) => {
  const socket = useContext(SocketContext)
  const toDisp = useRef<HTMLVideoElement>(null);
  const fromDisp = useRef<HTMLVideoElement>(null);
  // const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const connectionRef = useRef<any>();
  const [localStream, setLocalStream] = useState<MediaStream>()
  // const peers = useRef<{ [key: string]: Peer.Instance }>({});
  const [peers, setPeers] = useState<{ [key: string]: Peer.Instance }>({});
  const [streams, setStreams] = useState<{ [key: string]: MediaStream }>({});
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        fromDisp.current!.srcObject = stream



      })
      .catch((error) => console.error('Error accessing camera:', error));

    const peer = new Peer({ initiator: true, stream: localStream, trickle: false });

    peer.on('signal', (signal: SignalData) => {
      console.log('Signal out')
      socket.emit('signal', { signal, from: userId, room: params.id });
    });

    peer.on('stream', (toStream) => {
      console.log('myStream created')
      // setRemoteStreams({ ...remoteStreams, [userId]: toStream });
    });

    setPeers({ ...peers, [userId]: peer })

    socket.on('signal', ({ signal, from }: { signal: SignalData, from: string }) => {
      console.log('Signal in', from)
      const peer = new Peer({ initiator: false, stream: localStream, trickle: false });
      peer.on('signal', (signal: SignalData) => {
        socket.emit('answer', { signal, from: userId, room: params.id });
      });
      peer.on('stream', (toStream) => {
        console.log('Stream -> ', from)
        setStreams({ ...streams, [from]: toStream })
        // Handle the remote stream, e.g., display it in a video element
      });

      peer.signal(signal);
      setPeers({ ...peers, [from]: peer })
      // setPeer(peer);
    });

    socket.on('answer', ({ answer, from }: { answer: any, from: string }) => {
      peers[from]?.signal(answer)
    });

    socket.on('ice-candidate', (candidate: any, id: string) => {
      if (peer) {
        peer.signal(candidate);
      }
    });
    // callUser()
    return () => {
      Object.values(peers).forEach((item) => item.destroy());
    }
  }, [])


  console.log(peers)
  return (
    <div className="app-container">
      {/* <HStack>
        <Avatar borderWidth={4} src={'/avatars/1.png'} />
      </HStack>
      <Divider my={1} /> */}
      {/* <SimpleGrid h={'full'} minChildWidth={180} overflow={'auto'} spacing={2} pb={1} pr={1} w={'full'}>
        {
          Array.from({ length: 4 }, () => ({
            users: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => ({
              avatar: `/avatars/${faker.number.int({ min: 1, max: 8 })}.png`,
              name: faker.person.fullName()
            })),
            creator: {
              avatar: `/avatars/${faker.number.int({ min: 1, max: 8 })}.png`,
              name: faker.person.fullName()
            },
            timeFrom: faker.date.past(),
            time: faker.number.int({ min: 1, max: 10000 })
          })).map((_, index) => (
            <Box position={'relative'} borderWidth={1} h={200} shadow={'sm'} cursor={'pointer'} _hover={{ shadow: 'md' }} key={index} p={4} rounded={'md'}>
              <HStack gap={2} position={'absolute'} top={1} left={1}>
                <Avatar name='Ryan Florence' src={_.creator.avatar} ><AvatarBadge boxSize='0.8em' borderWidth={2} bg='green.500' /></Avatar>
                <Text>{_.creator.name}</Text>
              </HStack>
              <Center h={'full'} color={'teal'}>
                <MicrophoneIcon height={48} width={48} />
              </Center>
            </Box>
          ))
        }
      </SimpleGrid> */}

      <VStack as={Center} h={'full'} overflow={'auto'}>
        <Avatar size={'2xl'} borderWidth={4} src={'https://randomuser.me/api/portraits/men/1.jpg'} />
        <Stack direction={['column', 'column', 'column', 'row']}>
          <video ref={fromDisp} controls autoPlay />
          {
            Object.values(peers).map((_, i) => <video controls autoPlay key={i} ref={(videoRef) => {
              // (videoRef as HTMLVideoElement).srcObject = _
            }} />)
          }
        </Stack>
      </VStack>
      <Box position='relative'>
        <Divider />
        {/* <AbsoluteCenter bg='white' p={2} rounded={'full'}>
          <Box position={'relative'} rounded={'full'} p={1} borderWidth={1} borderColor={'red'}>
            <span className="animate-ping absolute top-0 left-0 inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <IconButton isRound colorScheme="red" size={'lg'} icon={<MicrophoneIcon height={36} width={36} />} aria-label={""} />
          </Box>
        </AbsoluteCenter> */}
      </Box>
      <HStack py={4} gap={3} justify={'space-between'}>
        <HStack gap={3}>
          <IconButton isRound colorScheme="teal" icon={<VideoCameraIcon height={24} width={24} />} aria-label={""} />
          <IconButton isRound colorScheme="teal" icon={<SpeakerWaveIcon height={24} width={24} />} aria-label={""} />
          <Slider aria-label='slider-ex-4' w={20} defaultValue={30}>
            <SliderTrack bg='teal.100'>
              <SliderFilledTrack bg='teal' />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color='teal'><MicrophoneIcon height={16} width={16} /> </Box>
            </SliderThumb>
          </Slider>
        </HStack>
        <HStack gap={3}>
          {/* <IconButton isRound colorScheme="teal" icon={<Squares2X2Icon height={24} width={24} />} aria-label={""} /> */}
          <Divider orientation='vertical' />
          <IconButton isRound colorScheme="red" onClick={() => navigate('/call')} icon={<PhoneXMarkIcon height={24} width={24} />} aria-label={""} />
        </HStack>
      </HStack>
    </div>
  )
}

export default CallRoom