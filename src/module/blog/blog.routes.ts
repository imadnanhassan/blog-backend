import express from 'express';
import { isAuthenticated } from '../../middleware/auth';
import { BlogController } from './blog.controller';
import { verifyAdminToken } from '../../middleware/verifyAdminToken';

const blogRouter = express.Router();

blogRouter.post('/', isAuthenticated, BlogController.createBlog);
blogRouter.patch('/:id',verifyAdminToken, isAuthenticated, BlogController.updateBlog);
blogRouter.delete('/:id',verifyAdminToken, isAuthenticated, BlogController.deleteBlog);
blogRouter.get('/', BlogController.getAllBlogs);



export default blogRouter;
