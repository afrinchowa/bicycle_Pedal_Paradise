import { TUser } from '../../app/modules/user/user.interface';
import { BicycleModel } from '../bicycle/bicycle.model';
import { TOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';

const createOrder = async (user: TUser, payload: TOrder, client_ip:string, res): Promise<TOrder> => {
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

// Payment Integration
const shurjoPayload={
  amount:payload.totalPrice,
  order_id:result._id,
  currency:"BDT",
  customer_name:user.name,
  customer_address:user.email,
  customer_email:user.email,
  customer_phone:"N/A",
  customer_city:"N/A",
  client_ip,
};

const payment = await orderUtils.makePayment(shurjoPayload, res)

  return {result, payment};
};

const getOrder = async () => {
  const result = await Order.find();
  return result;
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
  orderRevenue,
};
