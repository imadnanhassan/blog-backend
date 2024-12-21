import { Router } from 'express';
import { loginSchema, refreshSchema, registerSchema } from './auth.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import authController from './auth.controller';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest(registerSchema),
  authController.register
);
authRoutes.post('/login', validateRequest(loginSchema), authController.login);
authRoutes.post(
  '/refresh',
  validateRequest(refreshSchema),
  authController.refresh
);

export default authRoutes;
