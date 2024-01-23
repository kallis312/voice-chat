
import { Request, Response } from 'express';
import { Types, model } from 'mongoose';
import { ValidationError } from 'yup';
import { io, SocketUser } from '@Conf/socket';
import { getUserSockets } from '@Utils/getUserSockets';
import { AuthUser } from '@Types/types';
import { objectIdValidator } from '@Validate/commonValidator';
import { callCreateValidator } from '@Validate/callValidator';

const RecordModel = model('Record')

export const createCall = async (req: Request, res: Response) => {
  try {
    const { to } = callCreateValidator.validateSync(req.body)
    const user = req.user as AuthUser

    const newRecord = new RecordModel({ from: user._id, to: to })
    const createRoom = await newRecord.save()
    // io.users[to].forEach((socket: any) => {
    //   io.to(socket).emit('noti', createRoom._id)
    // })
    to.forEach((user) => {
      if (io.users[user])
        io.users[user].forEach((socket: any) => {
          io.to(socket).emit('noti', createRoom._id)
        })
    })
    // console.log("create-room -> ", sockets)
    res.status(201).json({
      message: 'Chat room created successfully',
      result: createRoom._id
    })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}

export const enterRoom = async (req: Request, res: Response) => {
  try {
    const { id: roomId } = objectIdValidator.validateSync(req.params)
    const { _id: userId } = req.user as AuthUser
    const room = await RecordModel.findById(roomId);
    if (userId === room.creator) {
      res.status(201).json({
        message: 'Room entered successfully',
        result: room
      })
    }
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}