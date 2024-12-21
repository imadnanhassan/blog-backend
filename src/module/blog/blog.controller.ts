import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { IBlog } from './blog.interface';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData: IBlog = { ...req.body, author: req.user._id };
  const blog = await blogService.createBlog(blogData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    data: blog,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await blogService.updateBlog(id, req.body);
  if (!blog) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({
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
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await blogService.deleteBlog(id);
  if (!blog) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({
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
});
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const blogs = await blogService.getAllBlogs(filters);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blogs fetched successfully',
    data: blogs,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
