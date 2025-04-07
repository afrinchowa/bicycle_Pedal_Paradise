
import { Bicycle } from "./bicycle.interface";
import { BicycleModel } from "./bicycle.model";



const createBicycleIntoDB = async (bicycleData: Bicycle) => {
  
  const result = await BicycleModel.create(bicycleData); //

  return result;
};

const getAllBicyclesFromDB = async (searchTerm?: string) => {
  console.log("Search Term:", searchTerm);
  let filter = {};
  if (searchTerm) {
    filter = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }
  const result = await BicycleModel.find(filter).sort({ createdAt: -1 });
  return result;
};
const getSingleBicycleFromDB = async (id: string) => {
  const result = await BicycleModel.findById(id);
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
