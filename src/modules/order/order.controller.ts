import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await orderService.createOrder(payload);

    const response = {
      _id: result._id,
      email: result.email,
      product: result.product,
      quantity: result.quantity,
      totalPrice: result.totalPrice,
      createdAt: result.createdAt || new Date().toISOString(),
      updatedAt: result.updatedAt || new Date().toISOString(),
    };

    res.json({
      message: 'Order created successfully',
      success: true,
      data: response,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Error',
      error,
    });
  }
};

const orderRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.orderRevenue();

    res.send({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue: result },
    });
  } catch (error) {
    res.json(error);
  }
};

export const orderController = {
  createOrder,
  orderRevenue,
};
