import { createContext } from 'react';
import { io, Socket } from "socket.io-client";

export const socket: Socket = io('https://192.168.143.55:8080', {
  transports: ['websocket']
});

export const SocketContext = createContext<Socket>(socket);