// auth.controller.ts

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await authService.registerUser(payload);

  res.status(StatusCodes.CREATED).json({
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const tokens = await authService.loginUser(payload);

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully',
    data: tokens,
  });
});

const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshAccessToken(refreshToken);

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: 'Access token refreshed successfully',
    data: tokens,
  });
});

export const authController = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
