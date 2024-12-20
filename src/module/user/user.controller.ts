import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req, res) => {
  // Implement logic to create a new user
  const payload = req.body;
  const result = await userService.createUsertoDB(payload);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

export const userController = {
  createUser,
};
