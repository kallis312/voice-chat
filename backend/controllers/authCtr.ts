import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { model } from 'mongoose';
import { ValidationError } from 'yup';
import { loginValidator, signupValidator } from '../validators/authValidator';
import { AuthUser } from '@Types/types';

const secretKey = process.env.SECRET_KEY || 'secret';

const UserModel = model('User')

const getUserInfo = (email: string, password: string) => new Promise(async (resolve, reject) => {
  try {
    const user = await UserModel.findOne({ email }, 'ID email password')
    if (!user) {
      throw new Error('User not found')
    }
    if (!compareSync(password, user.password)) {
      throw new Error('Invalid password')
    }
    resolve({ email: user.email, _id: user._id })
  } catch (error: any) {
    reject(error)
  }
})

const getUserToken = (user: any) => 'JWT ' + sign(user, secretKey, { expiresIn: '1 days' })

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginValidator.validateSync(req.body)
    const userInfo = await getUserInfo(email, password)
    const token = getUserToken(userInfo);
    res.json({ user: userInfo, token })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = signupValidator.validateSync(req.body)
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) throw new Error('User already exists')
    const nUser = new UserModel({ email, password })
    await nUser.save();
    return res.json({ message: 'Success' })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}

export const tokenLogin = async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthUser
    res.json({ user: user })
  } catch (err: any) {
    const error = err as ValidationError
    return res.status(422).json({ errors: error.errors || err.message })
  }
}

export default { login, signup }