import { Router } from 'express';
import { orderController } from './order.controller';

const router = Router();

router.post('/create-order', orderController.createOrder);
router.get('/', orderController.getAllOrders);

export const OrderRoutes = router;
