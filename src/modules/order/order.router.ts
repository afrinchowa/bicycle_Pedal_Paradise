import { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

orderRouter.post('/orders', orderController.createOrder);
orderRouter.get('/orders', orderController.getOrder);
orderRouter.get('/orders/revenue', orderController.orderRevenue);

export default orderRouter;
