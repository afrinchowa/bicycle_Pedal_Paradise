import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const { data: bicycleData } = req.body;

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
    const result = await BicycleServices.getAllbicyclesFromDB();
    res.status(200).json({
      success: true,
      message: 'Bicycles are retrieved successfully',
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
  } catch (err: any) {
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
};
