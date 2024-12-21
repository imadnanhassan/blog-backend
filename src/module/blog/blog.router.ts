import { Router } from 'express';
import { blogController } from './blog.controller';

const blogRouter = Router();

blogRouter.post('/', blogController.createBlog);

export default blogRouter;
