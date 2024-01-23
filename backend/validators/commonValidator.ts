import { Types } from 'mongoose';
import { object, string } from 'yup';

export const objectIdValidator = object({
  id: string().required().test(value => Types.ObjectId.isValid(value)),
}).required()