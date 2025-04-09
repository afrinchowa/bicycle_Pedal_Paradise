import express from 'express';
import { BicycleControllers } from './bicycle.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { bicycleValidation } from './bicycle.validation';

const router = express.Router();

// will call controller func
router.post(
  '/create-Bicycle',
  validateRequest(bicycleValidation.createBicycleSchemaValidation),
  BicycleControllers.createBicycle,
);

router.get('/', BicycleControllers.getAllBicycles);

router.get('/:id', BicycleControllers.getSingleBicycle);

router.put('/:id', BicycleControllers.updateBicycle);

router.delete('/:id', BicycleControllers.deleteBicycle);
export const BicycleRoutes = router;
