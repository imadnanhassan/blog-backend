import { Router } from 'express';
import { blockUserController } from './admin.controller';

const adminRoutes = Router();

adminRoutes.patch('/users/:userId/block', blockUserController.blockUser);

export default adminRoutes;
