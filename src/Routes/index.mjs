import { Router } from "express";
import userRouter from "./userRouter.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);

export default rootRouter;
