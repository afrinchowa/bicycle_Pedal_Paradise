import catchAsync from '../../utils/catchAsync';

import { UserServices } from './user.service';


const createUser = catchAsync(async (req, res) => {
  try {
    const payload = req.body;
    const result = await UserServices.createUser(payload);

    res.json({
      status: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
});
const getUser = catchAsync(async (req, res) => {
  try {
const result = await UserServices.getUser()

res.send({
  status:true,
  message: 'Users getting successfully',
  result,
})
   
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
});
const getSingleUser = catchAsync(async (req, res) => {
  try {
    const userId =req.params.userId

const result = await UserServices.getUser(userId)

res.send({
  status:true,
  message: 'User getting successfully',
  result,
})
   
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
});
const updateUser = catchAsync(async (req, res) => {
  try {
    const userId =req.params.userId
    const body =req.body
const result = await UserServices.updateUser(userId,body)

res.send({
  status:true,
  message: 'User updated successfully',
  result,
})
   
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
});
const deleteUser = catchAsync(async (req, res) => {
  try {
    const userId =req.params.userId
 await UserServices.deleteUser(userId)

res.send({
  status:true,
  message: 'User deleted successfully',
  result:{},
})
   
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
});
export const UserControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
