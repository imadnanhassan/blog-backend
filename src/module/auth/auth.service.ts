// auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from './auth.interface';
import { UserModel } from '../user/user.model';
import config from '../../config';
import { StatusCodes } from 'http-status-codes';

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

// const loginUser = async (payload: {
//   email: string;
//   password: string;
// }): Promise<LoginResponse> => {
//   // Find the user by email
//   const user = await UserModel.findOne({ email: payload.email });
//   if (!user || !(await bcrypt.compare(payload.password, user.password))) {
//     throw new Error('Invalid email or password');
//   }

//   console.log('Payload:', payload);
//   console.log('User Found:', user);

//   // Generate tokens
//   const accessToken = jwt.sign(
//     { userId: user._id, role: user.role },
//     config.secret_key as string,
//     {
//       expiresIn: '10d',
//     }
//   );
//   const refreshToken = jwt.sign(
//     { userId: user._id, role: user.role },
//     config.secret_key as string,
//     {
//       expiresIn: '7d',
//     }
//   );

//   // Save refresh token to the user document
//   user.refreshToken = refreshToken;
//   await user.save();

//   return { accessToken, refreshToken };
// };


const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw {
      success: false,
      message: 'Invalid email or password',
      statusCode: 401,
    };
  }

  // Check if the user is blocked
  if (user.isBlocked) {
    throw {
      success: false,
      message: 'User is blocked. Contact the administrator.',
      statusCode: 403,
    };
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw {
      success: false,
      message: 'Invalid email or password',
      statusCode: 401,
    };
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    config.secret_key as string,
    { expiresIn: '10d' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    config.secret_key as string,
    { expiresIn: '7d' }
  );

  // Save refreshToken in the database
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};




const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const decoded = jwt.verify(refreshToken, config.secret_key as string);
  const user = await UserModel.findOne({ refreshToken });

  if (!user) {
    throw new Error('Invalid refresh token');
  }

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    config.secret_key as string,
    { expiresIn: '10d' }
  );

  return accessToken;
};

export const authService = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
