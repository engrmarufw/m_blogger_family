import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { UserValidation } from '../user/userValidation';
import auth from '../../middlewares/auth';
import { validateToken } from '../../middlewares/tokenValidation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.register,
);
authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

authRouter.post('/logout', validateToken, AuthControllers.logout);

export default authRouter;
