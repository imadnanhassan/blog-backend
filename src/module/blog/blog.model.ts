import mongoose, { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IBlog>('Blog', BlogSchema);
