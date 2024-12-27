import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import BlogService from './blog.service';

export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const BlogController = {
  createBlog,
};
