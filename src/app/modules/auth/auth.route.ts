
import { Router } from "express";

import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidationSchema from "../user/userValidation";



const authRoute = Router();

authRoute.post('/register', validateRequest(userValidationSchema), AuthController.register);


export default authRoute;