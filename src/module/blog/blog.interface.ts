import { ObjectId } from 'mongodb';

export interface IBlog {
  title: string;
  content: string;
  author: ObjectId;
}
