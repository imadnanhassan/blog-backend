import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from './user.interface';
import User from './user.model';
import config from '../../config';

// Function to create a new user
export const createUser = async (
  email: string,
  password: string,
  name: string,
  role: 'user' | 'admin'
): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, name, role });
  await user.save();
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  console.log('User fetched:', user);
  return user;
};
export const verifyPassword = async (
  enteredPassword: string,
  storedPassword: string
) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};
export const generateToken = (user: any) => {
  return jwt.sign({ userId: user._id, role: user.role }, 'blog_backend', {
    expiresIn: '1h',
  });
};