import { Request, Response } from "express";
import User from "./user.model";

// req and response manage
const createUser=async(req:Request,res:Response)=>{


try{
    const payload = req.body;
    const result = await User.create(payload);
    res.json({
        message:'User created successfully',
        data:result,
    })
    }
catch(error){
   res.json({
    status:false,
    message:"Something went wrong",
    error
   }) 

}




export const UserController={
    createUser,
}