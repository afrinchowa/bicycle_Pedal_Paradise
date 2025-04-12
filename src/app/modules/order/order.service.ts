/* eslint-disable @typescript-eslint/no-explicit-any */
import { BicycleModel } from '../bicycle/bicycle.model';
import { TOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';

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

interface VerifiedPayment {
  sp_code: string;
  transaction_status: string;
  method: string;
  date_time: string;
  sp_message: string;
  bank_status: string;
}
const verifyPayment = async (order_id: string): Promise<VerifiedPayment[]> => {
  const verifiedPayment: VerifiedPayment[] = (await orderUtils.verifyPayment(
    order_id,
  )) as VerifiedPayment[];

  if (verifiedPayment.length > 0) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status || 'n/a',
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const orderService = {
  createOrder,
  getOrder,
  getOrdersByUserEmail,
  orderRevenue,
  verifyPayment,
};
