import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';

const userRouter = Router();

// Block or unblock user
userRouter.patch(
  '/:userId/:action(block|unblock)',
  auth('admin'),
  userController.toggleBlockUser,
);

export default userRouter;
