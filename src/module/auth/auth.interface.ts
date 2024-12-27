import { TUser } from "../user/user.interface";

export interface IAuth extends TUser {
  accessToken: string;
  refreshToken: string;
}
