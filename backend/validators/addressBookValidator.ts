import { number, object, string } from 'yup';
import { Types } from 'mongoose';

export const addUserValidator = object({
  addUser: string().required().test(value => Types.ObjectId.isValid(value)),
}).required()

export const updateUserValidator = object({
  id: string().required().test(value => Types.ObjectId.isValid(value)),
  status: number().integer().required(),
}).required()


export const deletedUserValidator = object({
  id: string().required().test(value => Types.ObjectId.isValid(value)),
}).required()

export const getUsersValidator = object({
  _id: string().required().test(value => Types.ObjectId.isValid(value)),
}).required()