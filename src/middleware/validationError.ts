import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const validationErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    const errorDetails = err.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation error occurred',
      errorSources: errorDetails,
    });
  }

  next(err);
};

export default validationErrorHandler;
