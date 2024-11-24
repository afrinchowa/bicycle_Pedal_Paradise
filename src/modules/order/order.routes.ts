import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();
const orderController = new OrderController();

router.post('/api/orders', orderController.createOrder);
router.get('/api/revenue', orderController.calculateRevenue);

export default router;
