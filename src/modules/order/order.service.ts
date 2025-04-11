import { BicycleModel } from '../bicycle/bicycle.model';
import { TOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (payload: TOrder): Promise<TOrder> => {
  const result = await Order.create(payload);

  const product = await BicycleModel.findById(payload.product);

  if (product) {
    const newQuantity = product.quantity - payload.quantity;
    const updateData = {
      quantity: newQuantity,
      inStock: newQuantity > 0,
    };

    await BicycleModel.findByIdAndUpdate(payload.product, updateData);

    console.log(newQuantity);
  }

  return result;
};

const getOrder = async () => {
  const result = await Order.find().populate('product');
  return result;
};

const getOrdersByUserEmail = async (email?: string) => {
  try {
    const query = email ? { email } : {};
    const orders = await Order.find(query);
    return orders;
  } catch (error: any) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

const orderRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result[0]?.totalRevenue || 0;
};

export const orderService = {
  createOrder,
  getOrder,
  getOrdersByUserEmail,
  orderRevenue,
};
