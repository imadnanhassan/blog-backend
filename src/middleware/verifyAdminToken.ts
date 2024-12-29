import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../module/user/user.model';

export const verifyAdminToken =async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  //   const token = req.header('Authorization')?.replace('Bearer ', '');

  //   if (!token) {
  //     res.status(401).json({
  //       statusCode: 401,
  //       message: 'Access denied. No token provided.',
  //       data: null,
  //     });
  //     return;
  //   }

  //   try {
  //     const decoded = jwt.verify(token, config.secret_key as string) as {
  //       userId: string;
  //       role: string;
  //     };

  //     if (decoded.role !== 'admin') {
  //       res.status(403).json({
  //         statusCode: 403,
  //         message: 'Access denied. Admins only.',
  //         data: null,
  //       });
  //       return;
  //     }

  //     req.user = decoded;
  //     next();
  //   } catch (error) {
  //     res.status(400).json({
  //       statusCode: 400,
  //       message: 'Invalid token.',
  //       data: null,
  //     });
  //     return;
  //   }

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res
        .status(401)
        .send({ message: 'Access denied. No token provided.' });
    }
    const decoded = jwt.verify(token, 'blog_backend') as {
      userId: string;
      role: string;
    };
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).send({ message: 'Access denied. Admins only.' });
    }
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send({ message: 'Invalid token.' });
  }
};
