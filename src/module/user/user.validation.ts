import { z } from 'zod';

export const blockUserSchema = z.object({
  params: z.object({
    userId: z.string().min(1, 'User ID is required'),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
  }),
  params: z.object({
    userId: z.string().min(1, 'User ID is required'),
  }),
});
