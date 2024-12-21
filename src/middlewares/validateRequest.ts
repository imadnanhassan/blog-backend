import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: 'Validation error',
          data: (error as any).errors ? (error as any).errors : error.message,
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: 'Validation error',
          data: 'Unknown error',
        });
      }
    }
  };
