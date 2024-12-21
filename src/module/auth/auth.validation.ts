import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const logoutValidationSchema = z.object({
  body: z.object({
    token: z.string({ required_error: 'Token is required' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  logoutValidationSchema,
};
