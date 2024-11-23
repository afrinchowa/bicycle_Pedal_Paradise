import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, productId, quantity } = req.body;
    const order = await OrderServices.createOrder(email, productId, quantity);
    res.status(201).json({ success: true, message: 'Order created successfully', data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating order', error: err });
  }
};

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderServices.calculateTotalRevenue();
    res.status(200).json({ success: true, message: 'Total revenue retrieved successfully', data: revenue });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error calculating total revenue', error: err });
  }
};

export const OrderControllers = {
  createOrder,
  getTotalRevenue,
};
