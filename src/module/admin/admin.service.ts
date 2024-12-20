import { UserModel } from '../user/user.model';

export const blockUserService = async (userId: string): Promise<void> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw {
      message: 'User not found',
      statusCode: 404,
    };
  }

  user.isBlocked = true;
  await user.save();
};
