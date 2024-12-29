// import express from 'express';
// import { adminLogin } from './admin.controller';
// import { verifyAdminToken } from '../../middleware/verifyAdminToken';
// import { BlogController } from '../blog/blog.controller';
// import { blockUser, updateUser } from '../user/user.controller';


// const AdminRouter = express.Router();

// // // Admin login
// // AdminRouter.post('/login', adminLogin);

// // Blog management
// AdminRouter.put('/blog/:id', verifyAdminToken, BlogController.updateBlog);
// AdminRouter.delete('/blog/:id', verifyAdminToken, BlogController.deleteBlog);

// // User management
// AdminRouter.patch('/user/block/:id', verifyAdminToken, blockUser);
// AdminRouter.put('/user/:id', verifyAdminToken, updateUser);

// // export default AdminRouter;
