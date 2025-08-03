import { Router } from "express";
import { loginValidator, RegisterValidator } from "../Utils/validationMethods.mjs";
import UserControllers from "../Controllers/UserControllers.mjs";

const userRouter = Router();

userRouter.post("/register-user",RegisterValidator(), UserControllers.registerNewUser);
userRouter.post("/login",loginValidator(), UserControllers.userLogin);



export default userRouter;
