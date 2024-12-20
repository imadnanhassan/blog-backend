import express, { Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
import authRoutes from './module/auth/auth.router';
const app: Application = express();

// Middleware
app.use(express.json());

// applocation routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);
// Simple Routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

export default app;
