import mongoose, { Schema, Document, model } from 'mongoose';
import { IBlog } from './blog.interface';


const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const BlogModel = model<IBlog>('Blog', BlogSchema);
export default BlogModel;
