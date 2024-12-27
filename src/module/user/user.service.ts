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

// Function to find a user by email
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

// Function to verify a user's password
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Function to generate a JWT token for the user
export const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'adnan_hassan', {
    expiresIn: '10d',
  });
};




