import express from 'express';
import { BicycleController } from './bicycle.controller';

const router = express.Router();
const bicycleController = new BicycleController();

router.post('/api/products', bicycleController.createBicycle);
router.get('/api/products', bicycleController.getAllBicycles);
router.get('/api/products/:productId', bicycleController.getBicycleById);
router.put('/api/products/:productId', bicycleController.updateBicycle);
router.delete('/api/products/:productId', bicycleController.deleteBicycle);

export default router;
