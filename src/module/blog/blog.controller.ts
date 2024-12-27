import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { IBlog } from './blog.interface';
import mongoose from 'mongoose';
import {
  buildBlogQuery,
  buildBlogSort,
} from '../../queryBuilder/blogQueryBuilder';

const createBlog = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { title, content } = req.body;
    const authorId = req.user?._id;

    if (!authorId) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
      return;
    }

    const blogData: IBlog = {
      title,
      content,
      author: new mongoose.Types.ObjectId(authorId),
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogService.createBlog(blogData);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Blog created successfully',
      data: result,
    });
  }
);

const updateBlog = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const blog = await blogService.updateBlog(id, req.body);
    if (!blog) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Blog not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Blog updated successfully',
      data: blog,
    });
  }
);

const deleteBlog = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const blog = await blogService.deleteBlog(id);
    if (!blog) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Blog not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Blog deleted successfully',
      data: null,
    });
  }
);

const getBlogs = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const search = req.query.search as string;
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined;
    const author = req.query.author as string;
    const query = buildBlogQuery({ search, author });
    const sort = buildBlogSort(sortBy, sortOrder);
    const result = await blogService.getBlogs(query, sort);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Blogs fetched successfully',
      data: result,
    });
  }
);

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
