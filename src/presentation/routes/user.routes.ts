import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { AuthRepoImpl } from "../../infrastructure/repositories/auth.impl";
import { UserRepoImpl } from "../../infrastructure/repositories/user.impl";

const authRepo = new AuthRepoImpl();
const userRepo = new UserRepoImpl();
const userController = new UserController(userRepo, authRepo);

const userRouter = Router();

userRouter.patch("/ban/:uid", userController.ban);
userRouter.patch("/suspend/:uid", userController.suspend);
userRouter.patch("/activate/:uid", userController.activate);

export default userRouter;
