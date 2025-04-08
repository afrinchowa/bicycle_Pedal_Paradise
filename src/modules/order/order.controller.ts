// req and res manage

import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await OrderServices.createOrderInDB(orderData);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err || 'Failed to create order',
    });
  }
};

export const orderController = {
  createOrder,
};
