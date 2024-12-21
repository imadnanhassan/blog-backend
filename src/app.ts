import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';
import authRouter from './module/auth/auth.router';
import userRouter from './module/user/user.router';
import blogRouter from './module/blog/blog.router';

const app: Application = express();

// Middleware
app.use(express.json());

app.use(globalErrorHandler);

// applocation routes
app.use('/api/auth', authRouter);
app.use('/api/admin', userRouter);
app.use('/api/blogs', blogRouter);
// Simple Routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

export default app;
