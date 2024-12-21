export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
}
