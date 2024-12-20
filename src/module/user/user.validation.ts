import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().nonempty('Password is required for your safety'),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
