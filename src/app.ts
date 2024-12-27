import express, { Application, Request, Response } from 'express';
import Userrouter from './module/user/user.routes';
import blogRouter from './module/blog/blog.routes';
import globalErrorHandler from './middleware/globalErrorHandler';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalErrorHandler);

// applocation routes
app.use('/api/auth', Userrouter);
// app.use('/api/admin', userRouter);
app.use('/api/blogs', blogRouter);
// Simple Routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

export default app;
