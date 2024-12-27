import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

// const blockUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { userId } = req.params;
//     const user = await UserModel.findByIdAndUpdate(
//       userId,
//       { isBlocked: true },
//       { new: true }
//     );

//     if (!user) {
//        res.status(StatusCodes.NOT_FOUND).json({
//         success: false,
//         message: 'User not found',
//         statusCode: StatusCodes.NOT_FOUND,
//        });
//       return;
//     }

//     sendResponse(res, {
//       statusCode: StatusCodes.OK,
//       message: 'User blocked successfully',
//       data: user,
//     });
//   } catch (error) {
//     next(error); // Pass error to global error handler
//   }
// };



const blockUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  res.status(200).json({
    message: 'User blocked successfully.',
  });
};

const createAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new UserModel({
    name,
    email,
    password: hashedPassword,
    role: 'admin',
    isBlocked: false,
    createdAt: new Date(),
  });

  await newAdmin.save();

  res.status(201).json({ message: 'Admin created successfully' });
};




const updateUser = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!user) {
       res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
       });
      return;
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

export const UserController = {
  blockUser,
  updateUser,
};
