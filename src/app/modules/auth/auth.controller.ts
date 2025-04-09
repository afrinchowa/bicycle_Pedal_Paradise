import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const register = async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: result,
  });
};
const login = async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User logined successfully',
    token:result.token,
    data: result.verifiedUser,
  });
};

export const AuthController = {
  register,
  login,
};
