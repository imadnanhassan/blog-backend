import { IUser } from '../user/user.interface';

export interface IAuth extends IUser {
  accessToken: string;
  refreshToken: string;
}
