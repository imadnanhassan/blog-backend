import BlogModel from './blog.model';
import { IBlog } from './blog.interface';

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

const getAllBlogs = async (filters: any): Promise<any[]> => {
  const blogs = await BlogModel.find(filters).populate('author', 'name email');
  return blogs;
};

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
