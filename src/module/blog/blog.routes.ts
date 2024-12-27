import express from 'express';
import { isAuthenticated } from '../../middleware/auth';
import { BlogController } from './blog.controller';

const blogRouter = express.Router();

blogRouter.post('/', isAuthenticated, BlogController.createBlog);
blogRouter.patch('/:id', isAuthenticated, BlogController.updateBlog);
blogRouter.delete('/:id', isAuthenticated, BlogController.deleteBlog);

export default blogRouter;
