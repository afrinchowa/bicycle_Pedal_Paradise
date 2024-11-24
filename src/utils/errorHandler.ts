import { Response } from 'express';

export const handleError = (res: Response, error: any) => {
  res.status(500).json({
    message: 'An error occurred',
    success: false,
    error: error.message,
    stack: error.stack,
  });
};
