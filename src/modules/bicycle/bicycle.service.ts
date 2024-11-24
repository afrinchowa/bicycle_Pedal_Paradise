
import { Bicycle } from "./bicycle.interface";
import { BicycleModel } from "./bicycle.model";



const createBicycleIntoDB = async (bicycleData: Bicycle) => {
  
  const result = await BicycleModel.create(bicycleData); //

  return result;
};

const getAllBicyclesFromDB = async () => {
  const result = await BicycleModel.find();
  return result;
};
const getSingleBicycleFromDB = async (id: string) => {
  const result = await BicycleModel.findOne({ id });
  return result;
};
const updateBicycle = async (id: string, payload: Partial<Bicycle>) => {
  const result = BicycleModel.findByIdAndUpdate(id, payload)
  return result
}

const deleteBicycle = async (id: string) => {
  const result = BicycleModel.findByIdAndDelete(id)
  return result
}

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  deleteBicycle,
  updateBicycle,
};
