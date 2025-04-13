import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

// why not a zod validation middleware while posting????
orderRouter.post('/orders', orderController.createOrder);
orderRouter.get('/orders', orderController.getOrdersOfUsers);
orderRouter.get('/orders/revenue', orderController.orderRevenue);
orderRouter.get('/order/payment', orderController.verifyPayment);

export default orderRouter;
