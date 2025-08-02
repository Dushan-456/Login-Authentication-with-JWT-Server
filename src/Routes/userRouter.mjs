import { Router } from "express";
import { RegisterValidator } from "../Utils/validationMethods.mjs";
import UserControllers from "../Controllers/UserControllers.mjs";

const userRouter = Router();

userRouter.post("/register-user",RegisterValidator(), UserControllers.registerNewUser);



export default userRouter;
