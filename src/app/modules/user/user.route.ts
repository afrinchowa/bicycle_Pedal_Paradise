import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import userValidationSchema from './userValidation';


const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidationSchema),
  UserControllers.createUser
);

router.get('/', UserControllers.getUser);
router.get('/:userId', UserControllers.getSingleUser);
router.put(
  '/:userId',
  validateRequest(userValidationSchema), // optional: you can create a partial schema for update
  UserControllers.updateUser
);
router.delete('/:userId', UserControllers.deleteUser);

<<<<<<< HEAD
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

=======
>>>>>>> main
export const UserRoutes = router;
