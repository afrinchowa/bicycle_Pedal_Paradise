import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
// import { BicycleValidationSchema } from './bicycle.validation';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycle: bicycleData } = req.body;
    // data validation using zod
    // const zodparseData = BicycleValidationSchema.parse(bicycleData);

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
    const id = req.params.id;
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
    const id = req.params.id
    const body = req.body
    const result = await BicycleServices.updateBicycle(id, body)

    res.send({
      success: true,
      message: 'Bicycle updated successfully',
      result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await BicycleServices.deleteBicycle(id)

    res.send({
      success: true,
      message: 'Bicycle deleted successfully',
      result,
    })
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const BicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  deleteBicycle,
  updateBicycle
};
