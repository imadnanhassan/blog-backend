import BlogModel from './blog.model';
import { IBlog } from './blog.interface';
import { FilterQuery } from 'mongoose';

const createBlog = async (blogData: IBlog): Promise<IBlog> => {
  const blog = await BlogModel.create(blogData);
  return blog.populate('author', 'name email');
};

const updateBlog = async (
  blogId: string,
  blogData: Partial<IBlog>
): Promise<any | null> => {
  const blog = await BlogModel.findByIdAndUpdate(blogId, blogData, {
    new: true,
  }).populate('author', 'name email');
  return blog;
};

const deleteBlog = async (blogId: string): Promise<any | null> => {
  const blog = await BlogModel.findByIdAndDelete(blogId);
  return blog;
};

const getBlogs = async (
  query: FilterQuery<IBlog>,
  sort: Record<string, 1 | -1>
): Promise<IBlog[]> => {
  return BlogModel.find(query)
    .sort(sort)
    .populate('author', 'name email')
    .exec();
};

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
