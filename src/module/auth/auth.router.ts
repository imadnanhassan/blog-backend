import { Router } from 'express';
import { registerSchema, loginSchema, refreshSchema } from './auth.validation';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';

const authRouter = Router();

authRouter.post('/register',validateRequest(registerSchema),AuthController.register);
authRouter.post('/login', validateRequest(loginSchema), AuthController.login);
authRouter.post('/refresh',validateRequest(refreshSchema),AuthController.refresh);

export default authRouter;
