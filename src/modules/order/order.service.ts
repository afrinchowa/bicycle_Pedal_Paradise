import { BicycleModel } from '../bicycle/bicycle.model';
import { Order } from './order.interface'
import { OrderModel } from './order.model'




const createOrderInDB = async (orderData: Order) => {
  const product = await BicycleModel.findById(orderData.product);
  if (!product) throw new Error("Product not found");

  if (product.quantity < orderData.quantity) throw new Error("Insufficient stock");

  product.quantity -= orderData.quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  const totalPrice = orderData.quantity * product.price;
  const order = await OrderModel.create({ ...orderData, totalPrice });

  return order;
};

export const OrderServices = {
  createOrderInDB,
};


export const orderService = {
  createOrderInDB

}