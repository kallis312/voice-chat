import { object, ref, string } from 'yup';

const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

export const signupValidator = object({
  email: string().required().email(),
  password: string().required().matches(PASSWORD_REGEX, 'password must contain only letters and numbers with a minimum of 8 characters'),
  confirm: string().required().oneOf([ref('password'), ""], "confirmPassword doesn't match the password"),
}).required()

export const loginValidator = object({
  email: string().required().email(),
  password: string().required().matches(PASSWORD_REGEX, 'password must contain only letters and numbers with a minimum of 8 characters'),
})