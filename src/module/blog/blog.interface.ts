import mongoose from 'mongoose';

export interface IBlog {
 
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  // createdAt?: Date;
  // updatedAt?: Date;
}
