import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import userValidationSchema from './userValidation';
<<<<<<< HEAD
import auth from '../../middlewares/auth';
=======
>>>>>>> origin/fahima

const router = express.Router();

// router.post(
//   '/create-user',
//   validateRequest(userValidationSchema),
//   UserControllers.createUser
// );
router.post(
  '/create-user',
<<<<<<< HEAD
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log({ body: req.body });
      const parsedBody = await userValidationSchema.parseAsync(req.body);
      req.body = parsedBody;
      console.log({ parsedBody });
      next();
    } catch (error) {
      next(error);
    }
  },
=======
  validateRequest(userValidationSchema),
  UserControllers.createUser,
>>>>>>> origin/fahima
);

router.get('/:userId', UserControllers.getSingleUser);
router.put(
  '/:userId',
  validateRequest(userValidationSchema), // optional: you can create a partial schema for update
  UserControllers.updateUser,
);
router.delete('/:userId', UserControllers.deleteUser);

// authorization

router.get('/',auth("admin") ,UserControllers.getUser);
export const UserRoutes = router;
