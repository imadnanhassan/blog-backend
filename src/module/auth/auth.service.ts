import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from './auth.utils';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const registerUser = async (payload: TUser): Promise<TUser> => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw {
      success: false,
      message: 'User already exists',
      statusCode: StatusCodes.BAD_REQUEST,
      error: {
        details: 'A user with this email already exists',
      },
    };
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ ...payload, password: hashedPassword });

  return user;
};

const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw {
      success: false,
      message: 'Invalid email or password',
      statusCode: StatusCodes.UNAUTHORIZED,
      error: { details: 'The email address is not registered' },
    };
  }

  if (user.isBlocked) {
    throw {
      success: false,
      message: 'User is blocked. Contact the administrator.',
      statusCode: StatusCodes.FORBIDDEN,
      error: { details: 'User account is blocked' },
    };
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw {
      success: false,
      message: 'Invalid email or password',
      statusCode: StatusCodes.UNAUTHORIZED,
      error: { details: 'The password is incorrect' },
    };
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const decoded = verifyToken(refreshToken) as jwt.JwtPayload & {
    userId: string;
  };
  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw {
      success: false,
      message: 'Invalid refresh token',
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  }

  return generateAccessToken(user);
};

export const authService = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
