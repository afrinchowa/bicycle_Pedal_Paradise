import { Request, Response } from "express";
import { BicycleServices } from "./bicycle.service";

const createBicycle = async(req:Request,res:Response)=>{
    const bicycle = req.body

    const result = await BicycleServices.createBicycleIntoDB(bicycle);

// send response
try{
    res.status(200).json({
        success:true,
        message:'Bicycle is created successfully' ,
        data:result,
    });
    }catch(err){
        console.log(err);
    }
};

export const BicycleControllers={
    createBicycle,
}