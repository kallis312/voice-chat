import { Types } from 'mongoose';
import { array, object, string } from 'yup';

export const callCreateValidator = object({
  to: array().of(
    string().test(value => Types.ObjectId.isValid(value as string)).required(),
  ).required(),
}).required()