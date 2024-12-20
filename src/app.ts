import express, { Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
import authRoutes from './module/auth/auth.router';
import adminRoutes from './module/admin/admin.routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

// Middleware
app.use(express.json());

app.use(globalErrorHandler);

// applocation routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// Simple Routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

export default app;
