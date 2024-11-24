import { Request, Response } from 'express';
import { OrderService } from './order.service';

const orderService = new OrderService();

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);
      res
        .status(201)
        .json({
          message: 'Order created successfully',
          status: true,
          data: order,
        });
    } catch {
      res
        .status(500)
        .json({ message: 'Failed to create order', status: false });
    }
  }

  async calculateRevenue(req: Request, res: Response) {
    try {
      const revenue = await orderService.calculateRevenue();
      res
        .status(200)
        .json({
          message: 'Revenue calculated successfully',
          status: true,
          data: revenue,
        });
    } catch {
      res
        .status(500)
        .json({ message: 'Failed to calculate revenue', status: false });
    }
  }
}
