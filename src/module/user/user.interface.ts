import { USER_ROLE } from './user.constants';

export interface IUser {
  isModified(arg0: string): unknown;
  id: number;
  name: string;
  email: string;
  password: string;
  role: keyof typeof USER_ROLE;
  isBlocked: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
