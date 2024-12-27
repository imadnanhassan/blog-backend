import { z } from 'zod';

// User registration validation schema
export const userRegisterSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(5, { message: 'Email must be at least 5 characters' })
    .max(100, { message: 'Email cannot be more than 100 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password cannot be more than 20 characters' }),
});

// User login validation schema
export const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(5, { message: 'Email must be at least 5 characters' })
    .max(100, { message: 'Email cannot be more than 100 characters' }),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .nonempty('Password is required'),
});
