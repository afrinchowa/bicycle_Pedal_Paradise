import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter=Router()

userRouter.post("/create-user",UserController.createUser)

export default userRouter