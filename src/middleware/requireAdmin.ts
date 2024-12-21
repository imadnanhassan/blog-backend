import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(StatusCodes.FORBIDDEN).json({
    success: false,
    message: 'Forbidden: Admins only',
    statusCode: StatusCodes.FORBIDDEN,
  });
};

export default requireAdmin;
