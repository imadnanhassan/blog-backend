import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import UserModel from '../user/user.model';
import { StatusCodes } from 'http-status-codes';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from './auth.utils';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const registerUser = async (payload: IUser): Promise<IUser> => {
  const existingUser = await UserModel.findOne({ email: payload.email });
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
  const user = await UserModel.create({ ...payload, password: hashedPassword });

  return user;
};

const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const user = await UserModel.findOne({ email: payload.email });

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
  const user = await UserModel.findOne({ refreshToken });

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
