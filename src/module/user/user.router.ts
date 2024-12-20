import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const userRouter = Router();

userRouter.post(
  '/',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser
);

export default userRouter;
