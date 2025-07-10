import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { AuthRepoImpl } from "../../infrastructure/repositories/auth.impl";
import { AuthenticateUser } from "../../shared/middleware/auth.middleware";

const authRepo = new AuthRepoImpl();
const authController = new AuthController(authRepo);
const authRouter = Router();

authRouter.post("/create", authController.create);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

authRouter.get("/me", AuthenticateUser, authController.me);
authRouter.get("/:uid", authController.getUserById);

export default authRouter;
