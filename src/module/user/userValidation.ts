import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name must be provided and must be a string',
      })
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must not exceed 50 characters' }),

    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email({ message: 'Invalid email format' }),

    password: z
      .string({
        required_error: 'Password is required for your safety',
      })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' }),

    role: z
      .enum(['user', 'admin'], {
        required_error:
          'Role must be provided and must be either user or admin',
      })
      .default('user'),

    isBlocked: z
      .boolean({
        required_error:
          'isBlocked status must be provided and must be a boolean',
      })
      .default(false),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
