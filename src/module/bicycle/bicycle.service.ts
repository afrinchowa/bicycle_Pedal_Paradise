// import {bicycleModel} from "../bicycle.model";

import { Bicycle } from './bicycle.interface';
import { BicycleModel } from './bicycle.model';

const createBicycleIntoDB = async (bicycle: Bicycle) => {
 
   //built in static method
  const result = await BicycleModel.create(bicycle);
  return result;
 

  // const bicycle = new bicycle(bicycleData);// create an instance
  // if(await bicycle.iscycleExists(bicycleData.id)){
  // throw new Error('cycle already exists!');
  // }

  //const result=await bicycle.save();//built in  instance method


};

// const getAllbicyclesFromDB = async () => {
//   const result = await Bicycle.find();
//   return result;
// };
// const getSinglebicycleFromDB = async (id: string) => {
//   // const result = await bicycle.findOne({ id });
//   const result = await Bicycle.aggregate([
//     {
//       $match: {id:id}
//     }
//   ])
//   return result;
// };
// const deleteBicycleFromDB = async (id: string) => {
//   const result = await Bicycle.updateOne({ id }, { isDeleted: true });
//   return result;
// };

export const BicycleServices = {
  createBicycleIntoDB,
  //   getAllbicyclesFromDB,
  //   getSinglebicycleFromDB,
  //   deletebicycleFromDB,
};
