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
    res
      .status(500)
      .json({ success: false, message: 'Error creating bicycle', error: err });
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
    res.status(500).json({
      success: false,
      message: 'Error retrieving bicycles',
      error: err,
    });
  }
};

const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BicycleServices.getSingleBicycleFromDB(productId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Bicycle not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Bicycle retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving bicycle',
      error: err,
    });
  }
};

const updateBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BicycleServices.updateBicycleInDB(productId, req.body);
    res.status(200).json({
      success: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Error updating bicycle', error: err });
  }
};

const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BicycleServices.deleteBicycleFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Bicycle deleted successfully',
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Error deleting bicycle', error: err });
  }
};

export const BicycleController = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
