import express from 'express';
import { isAuthenticated } from '../../middleware/auth';
import { BlogController } from './blog.controller';

const blogRouter = express.Router();

blogRouter.post('/', isAuthenticated, BlogController.createBlog); 
// blogRouter.get('/', getAllBlogsHandler); // Get all blogs
// blogRouter.get('/:id', getBlogHandler); // Get a blog by ID
// blogRouter.put('/:id', isAuthenticated, updateBlogHandler); // Update a blog
// blogRouter.delete('/:id', isAuthenticated, deleteBlogHandler); // Delete a blog


export default blogRouter;
