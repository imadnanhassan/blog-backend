import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import BlogService from './blog.service';
import Blog from './blog.model';
import { buildQuery } from '../../builder/queryBuilder';

const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    const user = req.user;

    if (!user) {
      return sendResponse(res, {
        statusCode: 401,
        message: 'Unauthorized',
        data: null,
      });
    }

    const newBlog = await BlogService.createBlog(title, content, user.id);

    return sendResponse(res, {
      statusCode: 201,
      message: 'Blog created successfully',
      data: newBlog,
    });
  } catch (error) {
    return sendResponse(res, {
      statusCode: 500,
      message: 'Failed to create blog',
      data: (error as Error).message,
    });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id: blogId } = req.params;
    const { title, content } = req.body;

    if (!req.user) {
      return sendResponse(res, {
        statusCode: 401,
        message: 'Unauthorized: User not authenticated',
        data: null,
      });
    }

    const userId = req.user.id;
    const updatedBlog = await BlogService.updateBlog(blogId, userId, {
      title,
      content,
    });

    if (!updatedBlog) {
      return sendResponse(res, {
        statusCode: 404,
        message: 'Blog not found or unauthorized',
        data: null,
      });
    }

    return sendResponse(res, {
      statusCode: 200,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    console.error('Error in updateBlogController:', error);
    return sendResponse(res, {
      statusCode: 500,
      message: 'Internal server error',
      data: null,
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id: blogId } = req.params;

    if (!req.user) {
      return sendResponse(res, {
        statusCode: 401,
        message: 'Unauthorized',
        data: null,
      });
    }

    const userId = req.user.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return sendResponse(res, {
        statusCode: 404,
        message: 'Blog not found',
        data: null,
      });
    }

    if (blog.author.toString() !== userId) {
      return sendResponse(res, {
        statusCode: 403,
        message: 'Forbidden: You do not have permission to delete this blog',
        data: null,
      });
    }

    await Blog.findByIdAndDelete(blogId);

    return sendResponse(res, {
      statusCode: 200,
      message: 'Blog deleted successfully',
      data: null,
    });
  } catch (error) {
    console.error('Error in deleteBlog controller:', error);

    return sendResponse(res, {
      statusCode: 500,
      message: 'Internal server error',
      data: null,
    });
  }
};

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getAllBlogs(req.query);

    return sendResponse(res, {
      statusCode: 200,
      message: 'Blogs fetched successfully',
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return sendResponse(res, {
      statusCode: 500,
      message: 'Internal server error',
      data: null,
    });
  }
};

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
