// import { Request, Response, NextFunction } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import { IUser } from '../user/user.interface';
// import { verifyToken } from './auth.utils';
// import UserModel from '../user/user.model';
// import config from '../../config';
// import jwt from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser;
//     }
//   }
// }

// export const authenticateToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     res.status(StatusCodes.UNAUTHORIZED).json({
//       success: false,
//       statusCode: StatusCodes.UNAUTHORIZED,
//       message: 'No token provided!',
//     });
//     return;
//   }

//   try {
//     // const decoded = verifyToken(token) as { userId: string };
//     // const user = await UserModel.findById(decoded.userId);

//     const decoded: any = jwt.verify(token, config.secret_key as string);
//     req.user = decoded;

//     if (req.user?.isBlocked) {
//       res.status(403).json({
//         message: 'Account is blocked. Contact support.',
//       });

//       return;
//     }

//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid token' });

//     return;
//   }
// };
