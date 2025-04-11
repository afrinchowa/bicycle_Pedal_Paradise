import { Request, RequestHandler, Response } from 'express';
import { orderService } from './order.service';
import catchAsync from '../../app/utils/catchAsync';
import Order from './order.model';
import { orderUtils } from './order.utils';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await orderService.createOrder(payload);

    const shurjoPayPayload = {
      amount: result.totalPrice,
      order_id: result._id,
      currency: 'BDT',
      customer_name: result.email,
      customer_address: 'Bangladesh',
      customer_phone: '0123456789',
      customer_city: 'Dhaka',
      client_ip: '192.168.0.256',
    };

    let paymentResponse;
    try {
      paymentResponse = await orderUtils.makePayment(shurjoPayPayload);

      if (paymentResponse?.transactionStatus) {
        await Order.updateOne(
          { _id: result._id },
          {
            $set: {
              'transaction.id': paymentResponse.sp_order_id,
              'transaction.transactionStatus':
                paymentResponse.transactionStatus,
              'transaction.checkoutUrl': paymentResponse.checkout_url,
            },
          },
        );
      }
    } catch (paymentError) {
      const errorMessage = (paymentError as Error).message;
      paymentResponse = { error: errorMessage };
    }

    // ✅ Respond once with order & payment
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Order creation failed',
      error: (error as Error).message,
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
  res: Response,
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

const verifyPayment = catchAsync(async (req, res) => {
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
