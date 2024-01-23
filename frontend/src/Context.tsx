import { createContext, useState, useRef, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext<Socket | undefined>(undefined);

const socket = io('https://192.168.143.55:8080');

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState<any>();
    const [name, setName] = useState('');
    const [call, setCall] = useState<any>({});
    const [me, setMe] = useState('');
    const myVideo = useRef<HTMLVideoElement>();
    const userVideo = useRef<HTMLVideoElement>();
    const connectionRef = useRef<any>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current!.srcObject = currentStream;
            });
        const peer = new Peer({ initiator: false, trickle: false, stream });
        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            console.log('callUser', { from, name: callerName, signal });
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream },);
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current!.srcObject = currentStream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    const callUser = (id: string) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current!.srcObject = currentStream;
        });
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};
export { ContextProvider, SocketContext };