import { Router } from 'express';
import { authenticateToken } from '../auth/auth.middleware';
import requireAdmin from '../../middleware/requireAdmin';
import { validateRequest } from '../../middleware/validateRequest';
import { blockUserSchema, updateUserSchema } from './user.validation';
import userController from './user.controller';


const userRouter = Router();

// Admin actions
userRouter.patch(
  '/users/:userId/block',
  authenticateToken,
  requireAdmin,
  validateRequest(blockUserSchema),
  userController.blockUser
);

// User actions
userRouter.patch(
  '/users/:userId',
  authenticateToken,
  validateRequest(updateUserSchema),
  userController.updateUser
);

export default userRouter;
