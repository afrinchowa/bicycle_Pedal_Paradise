
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
const getSingleBicycleFromDB = async (_id: string) => {
  const result = await BicycleModel.findOne({ id:_id });
  // const result = await BicycleModel.aggregate([
  //   {
  //     $match: { id: _id },
  //   },
  // ]);
  return result;
};
const deleteBicycleFromDB = async (id: string) => {
  const result = await BicycleModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  deleteBicycleFromDB,
};
