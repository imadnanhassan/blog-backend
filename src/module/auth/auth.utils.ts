import jwt from 'jsonwebtoken';
import config from '../../config';
import { IUser } from './auth.interface';

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    config.secret_key as string,
    { expiresIn: '10d' }
  );
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    config.secret_key as string,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.secret_key as string);
};
