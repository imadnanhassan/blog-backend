import { IBlog } from './blog.interface';
import Blog from './blog.model';

export const createBlog = async (
  title: string,
  content: string,
  authorId: string
): Promise<IBlog> => {
  const blog = new Blog({ title, content, author: authorId });
  await blog.save();

  const populatedBlog = await Blog.findById(blog._id).populate(
    'author',
    'name email'
  );
  if (!populatedBlog) {
    throw new Error('Blog not found');
  }
  return populatedBlog;
};

const getBlogsToDb = async (): Promise<IBlog[]> => {
  return await Blog.find().populate('author', 'name email');
};

const getBlogByIdToDb = async (id: string): Promise<IBlog | null> => {
  return await Blog.findById(id).populate('author', 'name email');
};

const updateBlogToDb = async (
  id: string,
  data: Partial<IBlog>
): Promise<IBlog | null> => {
  return await Blog.findByIdAndUpdate(id, data, { new: true });
};

const deleteBlogToDb = async (id: string): Promise<IBlog | null> => {
  return await Blog.findByIdAndDelete(id);
};

const BlogService = {
  createBlog,
  getBlogByIdToDb,
  updateBlogToDb,
  deleteBlogToDb,
  getBlogsToDb,
};

export default BlogService;
