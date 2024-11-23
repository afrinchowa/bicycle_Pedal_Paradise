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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};

const getAllBicycles = async (req: Request, res: Response) => {
  try {
    const result = await BicycleServices.getAllbicyclesFromDB();
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  }catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err.message,
    });
  }
};

const getSingleBicycle = async (req: Request, res: Response) => {
    try {
      const { bicycleId } = req.params;
      const result = await BicycleServices.getSingleBicycleFromDB(bicycleId);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Bicycle not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Bicycle retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err.message,
      });
    }
  };

export const BicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
};
