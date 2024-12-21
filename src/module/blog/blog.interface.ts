import { Types } from 'mongoose';

export interface IAuthor {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

export interface IBlog {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  author: IAuthor;
  createdAt?: Date;
  updatedAt?: Date;
}
