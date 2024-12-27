import { buildQuery } from '../../builder/queryBuilder';
import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (
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

const updateBlog = async (
  blogId: string,
  userId: string,
  updatedData: { title?: string; content?: string }
) => {
  console.log('UpdateBlog Debug:', { blogId, userId, updatedData });

  const result = await Blog.findOneAndUpdate(
    { _id: blogId, author: userId }, 
    { $set: updatedData }, 
    { new: true } 
  ).populate('author', 'name email');

  if (!result) {
    console.log('Blog not found or unauthorized');
  }

  return result;
};

const deleteBlog = async (blogId: string, userId: string) => {
  const blog = await Blog.findOneAndDelete({ _id: blogId, author: userId });
  return blog ? true : false;
};


const getAllBlogs = async (query: any) => {
  const { conditions, sort } = buildQuery(query);

  try {
    const blogs = await Blog.find(conditions)
      .sort(sort)
      .populate('author', 'name email');
    return blogs;
  } catch (error) {
    throw new Error('Error fetching blogs');
  }
};

const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};

export default BlogService;
