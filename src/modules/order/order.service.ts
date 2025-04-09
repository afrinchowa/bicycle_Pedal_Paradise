import AppError from '../../app/errors/AppError';
import { BicycleModel } from '../bicycle/bicycle.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';
import httpStatus from 'http-status';

const createOrderInDB = async (orderData: Order) => {
  const product = await BicycleModel.findById(orderData.product);
  if (!product) throw new Error('Product not found');

  if (product.quantity < orderData.quantity)
    throw new Error('Insufficient stock');

  product.quantity -= orderData.quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  const totalPrice = orderData.quantity * product.price;
  const order = await OrderModel.create({ ...orderData, totalPrice });

  return order;
};

// get all orders
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find().populate('product');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found!');
  }
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
};
