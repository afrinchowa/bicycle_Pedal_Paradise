import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const register = async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: result,
  });
};

export const AuthController = {
  register,
};
