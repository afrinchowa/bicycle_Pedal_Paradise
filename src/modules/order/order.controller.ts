// req and res manage

import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;

  const result = await OrderServices.createOrderInDB(orderData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle ordered successfully!',
    data: result,
  });
});

// get all orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle orders retrieved successfully!',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
};
