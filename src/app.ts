import express, { Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
const app: Application = express();

// Middleware
app.use(express.json());

// applocation routes
app.use('/api/user', userRouter);

// Simple Routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

export default app;
