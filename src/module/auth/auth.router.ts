// auth.routes.ts

import { authController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest(AuthValidation.loginValidationSchema),
  authController.registerUser
);
authRoutes.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authController.loginUser
);
authRoutes.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  authController.refreshAccessToken
);

export default authRoutes;
