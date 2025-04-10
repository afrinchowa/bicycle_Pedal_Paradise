import { Router } from 'express';

import { AuthController } from './auth.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import userValidationSchema from '../user/userValidation';
import { AuthValidation } from './auth.validation';

const authRoute = Router();

authRoute.post(
  '/register',
  validateRequest(userValidationSchema),
  AuthController.register,
);
authRoute.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,
);

export default authRoute;
