import { disconnect, login } from "@Socket/authHandler"
import { model } from "mongoose"
import { Socket } from "socket.io"

const RecordModel = model('Record')

interface User {
  userId: string
  video: boolean
  audio: boolean
}


let peers: {
  [key: string]: {
    userId: string
  }
} = {}

export default (io: any) => {

  io.on("connection", (socket: Socket) => {
    socket.emit("me", socket.id)
    socket.on('auth-login', (token: string) => login(socket, token))
    socket.on("disconnect", () => disconnect(socket))

    socket.on('c2s-join', ({ roomId, userId }: { roomId: string, userId: string }) => {
      socket.join(roomId)
      // console.log('RoomId: ' + roomId)
      socket.broadcast.to(roomId).emit('s2c-receive', { socketId: socket.id })
    })
    // socket.broadcast.to('test').emit('c2s-receive', ({ socketId: socket.id }))

    socket.on('c2s-init', ({ socketId }: { socketId: string }) => {

      socket.to(socketId).emit('s2c-init', { socketId: socket.id })
      // socket.broadcast.to('test').emit('s2c-join', { socketId: socket.id, userId })
    })

    socket.on('c2s-signal', ({ signal, to }: { signal: any, to: string }) => {
      // console.log('signal :', { signal, to })

      socket.to(to).emit('s2c-signal', { signal, from: socket.id })
    })
    socket.on('BE-send-message', ({ roomId, msg, sender }) => {
      io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
    });
  })

}