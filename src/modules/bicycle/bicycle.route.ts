import express from 'express';
import { BicycleControllers } from './bicycle.controller';


const router = express.Router();

// will call controller func
router.post('/create-Bicycle', BicycleControllers.createBicycle);

router.get('/', BicycleControllers.getAllBicycles);

router.get('/:bicycleId', BicycleControllers.getSingleBicycle);

router.delete('/:bicycleId', BicycleControllers.deleteBicycle);
export const BicycleRoutes = router;
