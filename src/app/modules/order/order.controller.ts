/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { orderService } from './order.service';
import Order from './order.model';
import { orderUtils } from './order.utils';
import catchAsync from '../../utils/catchAsync';
import type { PaymentResponse } from './order.utils';

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await orderService.createOrder(payload);

  const shurjoPayPayload = {
    amount: result.totalPrice,
    order_id: result._id.toString(),
    currency: 'BDT',
    customer_name: result.email,
    customer_address: 'Bangladesh',
    customer_phone: '0123456789',
    customer_city: 'Dhaka',
    client_ip: req.ip || req.connection.remoteAddress || '127.0.0.1',
  };

  let paymentResponse: PaymentResponse;

  try {
    // ✅ Use makePaymentAsync instead of makePayment
    paymentResponse = await orderUtils.makePaymentAsync(shurjoPayPayload);

    if (paymentResponse?.transactionStatus) {
      await Order.updateOne(
        { _id: result._id },
        {
          $set: {
            'transaction.id': paymentResponse.sp_order_id,
            'transaction.transactionStatus': paymentResponse.transactionStatus,
            'transaction.checkoutUrl': paymentResponse.checkout_url,
          },
        },
      );
    }
  } catch (paymentError) {
    const errorMessage = (paymentError as Error).message;
    paymentResponse = { error: errorMessage };
  }

  return res.status(201).json({
    message: 'Order processed successfully',
    success: true,
    data: {
      _id: result._id,
      email: result.email,
      product: result.product,
      quantity: result.quantity,
      totalPrice: result.totalPrice,
      createdAt: result.createdAt || new Date().toISOString(),
      updatedAt: result.updatedAt || new Date().toISOString(),
    },
    payment: paymentResponse,
  });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getOrder();
  res.send({
    message: 'Orders retrieved successfully',
    success: true,
    data: result,
  });
});

const getOrdersOfUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
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
  },
);

const orderRevenue = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.orderRevenue();

  res.send({
    message: 'Revenue calculated successfully',
    success: true,
    data: { totalRevenue: result },
  });
});

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);
  res.status(201).json({
    message: 'Order verified successfully',
    status: true,
    data: order,
  });
});

export const orderController = {
  createOrder,
  getOrder,
  getOrdersOfUsers,
  orderRevenue,
  verifyPayment,
};
