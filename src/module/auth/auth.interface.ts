export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isBlocked?: boolean;
  role?: string;
  refreshToken?: string;
}
