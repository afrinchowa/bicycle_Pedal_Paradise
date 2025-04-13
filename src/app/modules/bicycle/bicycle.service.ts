import { FilterQuery } from 'mongoose';
import AppError from '../../errors/AppError';
import { IBicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';
import httpStatus from 'http-status';

// create a bicycle into db
const createBicycleIntoDB = async (payload: IBicycle) => {
  const exists = await BicycleModel.findOne({
    name: payload.name,
    brand: payload.brand,
    model: payload.model,
    type: payload.type,
    category: payload.category,
    isDeleted: false,
  });

  if (exists) {
    throw new AppError(httpStatus.CONFLICT, 'This bicycle already exists!');
  }

  const result = await BicycleModel.create(payload);

  return result;
};

// get all bicycles from db
const getAllBicyclesFromDB = async (
  searchTerm?: string,
  brand?: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  inStock?: boolean,
  model?: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
) => {
  const filter: FilterQuery<IBicycle> = { isDeleted: false };

  if (searchTerm) {
    filter.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  if (brand) filter.brand = { $regex: brand, $options: 'i' };
  if (category) filter.category = { $regex: category, $options: 'i' };
  if (model) filter.model = { $regex: model, $options: 'i' };
  if (inStock !== undefined) filter.inStock = inStock;
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = minPrice;
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }

  const skip = (page - 1) * limit;

  const sortOptions: Record<string, 1 | -1> = {};
  sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

  const bicycles = await BicycleModel.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const total = await BicycleModel.countDocuments(filter);
  return {
    data: bicycles,
    meta: {
      total,
      page,
      limit,
    },
  };
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
