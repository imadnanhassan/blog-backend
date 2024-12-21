import { Request, Response } from 'express';
import { authService } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IUser } from '../user/user.interface';

const register = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  const newUser = await authService.registerUser(user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: newUser,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authService.loginUser({ email, password });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Login successful',
    data: tokens,
  });
});

const refresh = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const accessToken = await authService.refreshAccessToken(refreshToken);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Access token refreshed',
    data: { accessToken },
  });
});

export const AuthController = {
  register,
  login,
  refresh,
};
