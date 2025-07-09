import { Router } from "express";

import { AuthenticateUser } from "../../shared/middleware/auth.middleware";

import authRouter from "./auth.routes";
import userRouter from "./user.routes";

import spaceRouter from "./space.routes";
import spaceMemberRouter from "./space-members.routes";

import fileRouter from "./file.routes";
import folderRouter from "./folder.routes";
import inviteRouter from "./invite.routes";

const appRouter = Router();

const prefix = "/api/v1";

appRouter.use(prefix + "/auth", authRouter);
appRouter.use(prefix + "/user", AuthenticateUser, userRouter);

appRouter.use(prefix + "/space", AuthenticateUser, spaceRouter);
appRouter.use(prefix + "/space-member", AuthenticateUser, spaceMemberRouter);
appRouter.use(prefix + "/invite", AuthenticateUser, inviteRouter);

appRouter.use(prefix + "/file", AuthenticateUser, fileRouter);
appRouter.use(prefix + "/folder", AuthenticateUser, folderRouter);

export default appRouter;