import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, config.secret_key as string) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { verifyToken };
