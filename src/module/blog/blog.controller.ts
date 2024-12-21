import catchAsync from '../../utils/catchAsync';

import { IBlog } from './blog.interface';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
 try {
   if (!req.user) {
     res
       .status(401)
       .json({ success: false, message: 'Unauthorized', statusCode: 401 });
     return;
   }
   const blogData: Omit<IBlog, '_id' | 'author'> = req.body;
   const userId = req.user._id;
   const blog = await BlogService.createBlogtoDb(blogData, userId);
   res
     .status(201)
     .json({
       success: true,
       message: 'Blog created successfully',
       statusCode: 201,
       data: blog,
     });
 } catch (error) {
   res
     .status(500)
     .json({
       success: false,
       message: 'Failed to create blog',
       statusCode: 500,
     });
 }
});
export const blogController = {
  createBlog,
};
