import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// create bicycle into db
const createBicycle = catchAsync(async (req: Request, res: Response) => {
  const result = await BicycleServices.createBicycleIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle is created successfully!',
    data: result,
  });
});

// get all bicycle from db | search and filter bicycle
const getAllBicycles = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm, brand, category, minPrice, maxPrice, inStock, model } =
    req.query;

  const result = await BicycleServices.getAllBicyclesFromDB(
    searchTerm as string,
    brand as string,
    category as string,
    minPrice ? parseFloat(minPrice as string) : undefined,
    maxPrice ? parseFloat(maxPrice as string) : undefined,
    inStock as boolean | undefined,
    model as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle retrieved successfully!',
    data: result,
  });
});
const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await BicycleServices.getSingleBicycleFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const updateBicycle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await BicycleServices.updateBicycle(id, body);

    res.send({
      success: true,
      message: 'Bicycle updated successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await BicycleServices.deleteBicycle(id);

    res.send({
      success: true,
      message: 'Bicycle deleted successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const BicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  deleteBicycle,
  updateBicycle,
};
