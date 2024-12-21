import express, { Request, Response } from 'express';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import userRouter from './module/user/user.router';
import authRouter from './module/auth/auth.router';
import { blogRoutes } from './module/blog/blog.route';

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRouter);

// Blog routes
app.use('/api', blogRoutes);
app.use('/api/admin/blogs', blogRoutes);

// User management routes
app.use('/api/admin/users/', userRouter);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
});

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

export default app;
