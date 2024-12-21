import { Router } from 'express';
import { authenticateToken } from '../auth/auth.middleware';
import { validateRequest } from '../../middleware/validateRequest';
import { blockUserSchema, updateUserSchema } from './user.validation';
import { UserController } from './user.controller';


const userRouter = Router();

// Admin actions
userRouter.patch('/users/:userId/block',authenticateToken,validateRequest(blockUserSchema),UserController.blockUser);

// User actions
userRouter.patch('/users/:userId', validateRequest(updateUserSchema));

export default userRouter;
