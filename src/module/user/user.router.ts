import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.post('/', userController.createUser);

export default userRouter;
