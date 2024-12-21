import { UserModel } from '../user/user.model';
import { IBlog } from './blog.interface';
import BlogModel from './blog.model';

const createBlogtoDb = async (
  blogData: Omit<IBlog, '_id' | 'author'>,
  userId: string
): Promise<IBlog> => {
  const author = await UserModel.findById(userId).select('name email').exec();
  if (!author) {
    throw new Error('Author not found');
  }
  const blog = new BlogModel({ ...blogData, author: author._id });
  await blog.save();
  const blogObject = blog.toObject();
  return {
    ...blogObject,
    author: { _id: author._id, name: author.name, email: author.email },
  };
};

export const BlogService = {
  createBlogtoDb,
};
