import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../user/user.interface';
import { verifyToken } from './auth.utils';
import UserModel from '../user/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'No token provided!',
    });
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'User not found!',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'Invalid token!',
    });
  }
};
