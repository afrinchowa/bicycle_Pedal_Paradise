import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';


const createBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycle: bicycleData } = req.body;
    const result = await BicycleServices.createBicycleIntoDB(bicycleData);
    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllBicycles = async (req: Request, res: Response) => {
  try {
    const result = await BicycleServices.getAllBicyclesFromDB();
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycleId } = req.params;
    const result = await BicycleServices.getSingleBicycleFromDB(bicycleId);
    res.status(200).json({
      success: true,
      message: 'Bicycles is retrieved successfully',
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
const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const { BicycleId } = req.params;
    const result = await BicycleServices.deleteBicycleFromDB(BicycleId);
    res.status(200).json({
      success: true,
      message: 'Bicycles is Deleted successfully',
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

export const BicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  deleteBicycle,
};
