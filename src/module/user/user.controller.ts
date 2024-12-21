import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import UserModel from './user.model';

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User blocked successfully',
      data: user,
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
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

export default {
  blockUser,
  updateUser,
};
