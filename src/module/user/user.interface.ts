import { USER_ROLE } from './user.constants';

export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
  role: keyof typeof USER_ROLE;
  isBlocked: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
