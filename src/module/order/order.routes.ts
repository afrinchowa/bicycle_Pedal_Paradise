import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();

router.post('/order', OrderControllers.createOrder);
router.get('/revenue', OrderControllers.getTotalRevenue);

export default router;
