/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser): Promise<TUser> => {
  const result = await User.create(payload);
  return result;
};

const getUser = async (userId?: string) => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (id: string, data: TUser) => {
  const user = await User.findById(id);
  if (!user) {
    return null; // If user not found, return null
  }

  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  return updatedUser;
};

const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    return null; // If user not found, return null
  }

  await User.findByIdAndDelete(id);
  return { message: 'User deleted successfully' }; // Return a success message
};

export const UserServices = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
