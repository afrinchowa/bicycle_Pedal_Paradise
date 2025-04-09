<<<<<<< HEAD

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";

const register = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
  };
const login = async (payload: ILoginUser) => {
    const user = await User.findOne({email:payload?.email}).select("+password");
    if(!user){
      throw new Error('User is not found')
    }const userStatus =user?.userStatus;

    if(userStatus==="blocked"){
      throw new Error("User is not active!!!")
    }

    const isPasswordMatch =await bcrypt.compare(payload?.password,user?.password);
    if(!isPasswordMatch){
      throw new Error('Password is incorrect ')
    }

    const token = jwt.sign({email:user?.email,role:user?.role},"secret",{expiresIn:"1d"});

    const verifiedUser ={name:user?.name,email:user?.email,role:user?.role}
    return {token,verifiedUser}
  };
  
export const AuthService={
    register,
    login
};
=======
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  register,
};
>>>>>>> origin/fahima
