import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.createUser(payload);

  res.json({
    status: true,
    message: 'User created successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await UserServices.getUser();
  res.send({
    status: true,
    message: 'Users getting successfully',
    result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await UserServices.getUser(userId);
  res.send({
    status: true,
    message: 'User getting successfully',
    result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  const result = await UserServices.updateUser(userId, body);
  res.send({
    status: true,
    message: 'User updated successfully',
    result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await UserServices.deleteUser(userId);
  res.send({
    status: true,
    message: 'User deleted successfully',
    result: {},
  });
});

export const UserControllers = {
<<<<<<< HEAD
  createStudent,
  createFaculty,
  createAdmin,
=======
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
>>>>>>> main
};
