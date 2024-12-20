import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../module/user/user.interface';
import { verifyToken } from '../module/auth/auth.utils';
import { UserModel } from '../module/user/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Middleware to verify JWT token
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'No token provided!',
    });
  }

  try {
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'User not found!',
      });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: 'Invalid token!',
    });
  }
};

export default authenticateToken;
