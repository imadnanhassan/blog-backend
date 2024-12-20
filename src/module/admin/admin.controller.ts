import { Request, Response } from 'express';
import { blockUserService } from './admin.service';

const blockUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await blockUserService(userId);
    return res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      statusCode: error.statusCode || 500,
    });
  }
};

export const blockUserController = {
  blockUser,
};
