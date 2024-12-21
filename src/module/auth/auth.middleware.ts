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
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'No token provided!',
    });
    return;
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'User not found!',
      });

      return;
    }

    req.user = user;
    next();
  } catch (error) {
     res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'Invalid token!',
     });
    return;
  }
};
