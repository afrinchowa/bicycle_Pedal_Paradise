import AppError from '../../app/errors/AppError';
import { BicycleFilter, IBicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';
import httpStatus from 'http-status';

// create a bicycle into db
const createBicycleIntoDB = async (payload: IBicycle) => {
  const result = await BicycleModel.create(payload);

  return result;
};

// get all bicycle from db
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

  // console.log(filter);
  const result = await BicycleModel.find(filter).sort({ createdAt: -1 });
  return result;
};

// get a single bicycle from db
const getSingleBicycleFromDB = async (id: string) => {
  const result = await BicycleModel.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found!');
  }

  return result;
};

// update bicycle
const updateBicycle = async (id: string, payload: Partial<IBicycle>) => {
  const result = await BicycleModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found!');
  }

  return result;
};

// soft delete
const deleteBicycle = async (id: string) => {
  const deletedBicycle = await BicycleModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedBicycle) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete bicycle');
  }

  return deletedBicycle;
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  deleteBicycle,
  updateBicycle,
};
