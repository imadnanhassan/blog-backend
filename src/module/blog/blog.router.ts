import { Router } from 'express';
import {
  createBlogSchema,
  updateBlogSchema,
  deleteBlogSchema,
  getAllBlogsSchema,
} from './blog.validation';
import { authenticateToken } from '../auth/auth.middleware';
import { validateRequest } from '../../middleware/validateRequest';
import { BlogController } from './blog.controller';

const blogRouter = Router();

blogRouter.post(
  '/',
  authenticateToken,
  validateRequest(createBlogSchema),
  BlogController.createBlog
);
blogRouter.patch(
  '/:id',
  authenticateToken,
  validateRequest(updateBlogSchema),
  BlogController.updateBlog
);
blogRouter.delete(
  '/:id',
  authenticateToken,
  validateRequest(deleteBlogSchema),
  BlogController.deleteBlog
);
blogRouter.get(
  '/',
  validateRequest(getAllBlogsSchema),
  BlogController.getAllBlogs
);

export default blogRouter;
