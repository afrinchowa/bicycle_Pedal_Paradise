// import {bicycleModel} from "../bicycle.model";

import { Bicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';

const createBicycleIntoDB = async (bicycle: Bicycle) => {
  try {
    const result = await BicycleModel.create(bicycle);
    return result;
  } catch (err) {
    throw new Error('Error creating bicycle: ' + err.message);
  }
};

const getAllBicyclesFromDB = async () => {
  try {
    const result = await BicycleModel.find();
    return result;
  } catch (err) {
    throw new Error('Error retrieving bicycles: ' + err.message);
  }
};

const getSingleBicycleFromDB = async (id: string) => {
  try {
    const result = await BicycleModel.findOne({ id });
    return result;
  } catch (err) {
    throw new Error('Error retrieving bicycle: ' + err.message);
  }
};
const deleteBicycleFromDB = async (id: string) => {
  try {
    const result = await BicycleModel.updateOne({ id }, { isDeleted: true });
    return result;
  } catch (err) {
    throw new Error('Error deleting bicycle: ' + err.message);
  }
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
    deleteBicycleFromDB,
};
