import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { registerSchema, loginSchema, refreshSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const authRouter = Router();

authRouter.post('/register',validateRequest(registerSchema),AuthController.register);
authRouter.post('/login', validateRequest(loginSchema), AuthController.login);
authRouter.post('/refresh',validateRequest(refreshSchema),AuthController.refresh);

export default authRouter;
