import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import sendResponse from '../utils/sendResponse';

export const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((error) => ({
          path: error.path.join('.'),
          message: error.message,
        }));

        return sendResponse(res, {
          statusCode: 400,
          message: 'Validation failed',
          data: errorMessages,
        });
      }
      next(err);
    }
  };
