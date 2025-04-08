import { BicycleFilter, IBicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';

const createBicycleIntoDB = async (payload: IBicycle) => {
  const result = await BicycleModel.create(payload); //

  return result;
};

const getAllBicyclesFromDB = async (
  searchTerm?: string,
  brand?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  inStock?: boolean,
  model?: string,
) => {
  console.log('Search Term:', searchTerm);
  let filter: BicycleFilter = {};
  if (searchTerm) {
    filter = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }

  // Additional filters
  if (brand) {
    filter.brand = { $regex: brand, $options: 'i' };
  }

  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  if (minPrice) {
    filter.price = { $gte: minPrice };
  }

  if (maxPrice) {
    if (!filter.price) filter.price = {};
    filter.price.$lte = maxPrice;
  }
  if (inStock !== undefined) {
    filter.inStock = inStock;
  }
  if (model) {
    filter.model = { $regex: model, $options: 'i' };
  }

  console.log(filter);
  const result = await BicycleModel.find(filter).sort({ createdAt: -1 });
  console.log(filter);
  return result;
};
const getSingleBicycleFromDB = async (id: string) => {
  const result = await BicycleModel.findById(id);
  return result;
};
const updateBicycle = async (id: string, payload: Partial<IBicycle>) => {
  const result = BicycleModel.findByIdAndUpdate(id, payload);
  return result;
};

const deleteBicycle = async (id: string) => {
  const result = BicycleModel.findByIdAndDelete(id);
  return result;
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  deleteBicycle,
  updateBicycle,
};
