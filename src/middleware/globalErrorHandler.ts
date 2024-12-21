import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || 'An unexpected error occurred',
    error: err.error || 'No additional error details',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default globalErrorHandler;
