import OrderModel from './order.model';
import BicycleModel from '../bicycle/bicycle.model';
import { Order } from './order.interface';

export class OrderService {
  async createOrder(order: Order) {
    const bicycle = await BicycleModel.findById(order.product);
    if (!bicycle || bicycle.quantity < order.quantity) {
      throw new Error('Insufficient stock');
    }
    bicycle.quantity -= order.quantity;
    if (bicycle.quantity === 0) {
      bicycle.inStock = false;
    }
    await bicycle.save();
    const newOrder = new OrderModel(order);
    return await newOrder.save();
  }

  async calculateRevenue() {
    const orders = await OrderModel.aggregate([
      {
        $lookup: {
          from: 'bicycles',
          localField: 'product',
          foreignField: '_id',
          as: 'bicycle',
        },
      },
      {
        $unwind: '$bicycle',
      },
      {
        $project: {
          totalRevenue: { $multiply: ['$quantity', '$bicycle.price'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalRevenue' },
        },
      },
    ]);
    return orders[0]?.totalRevenue || 0;
  }
}
