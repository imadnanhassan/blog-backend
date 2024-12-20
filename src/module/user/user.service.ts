import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUsertoDB = async (payload: IUser): Promise<IUser> => {
  const result = await UserModel.create(payload);

  return result;
};

export const userService = {
  createUsertoDB,
};
