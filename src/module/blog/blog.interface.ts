import mongoose from 'mongoose';

export interface IBlog {
  _id?: mongoose.Types.ObjectId;
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
