/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
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

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrder();

    res.send({
      message: 'Orders retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
};

const getOrdersOfUsers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.query;
    let result;
    if (email) {
      result = await orderService.getOrdersByUserEmail(email as string);
    } else {
      result = await orderService.getOrder();
    }
    if (!result || result.length === 0) {
      res.status(404).json({
        message: 'No orders found.',
        success: false,
      });
      return;
    }
    res.json({
      message: 'Orders retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: err.message,
      stack: err.stack,
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
  getOrder,
  getOrdersOfUsers,
  orderRevenue,
};
