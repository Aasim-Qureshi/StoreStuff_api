import { Router } from "express";

import { SpaceController } from "../controllers/Space.controller";
import { SpaceRepoImpl } from "../../infrastructure/repositories/space.impl";
import { SpaceMemberRepoImpl } from "../../infrastructure/repositories/space-member.impl";
import { CloudFileHandler } from "../../infrastructure/cloudinary/cloudFileHandler";
import { FolderRepoImpl } from "../../infrastructure/repositories/folder.impl";

const spaceRepo = new SpaceRepoImpl();
const spaceMemberRepo = new SpaceMemberRepoImpl();
const folderRepo = new FolderRepoImpl
const cloudFileHandler = new CloudFileHandler();

const spaceController = new SpaceController(spaceRepo, spaceMemberRepo, cloudFileHandler, folderRepo);
const spaceRouter = Router();

spaceRouter.post("/create", spaceController.create);

spaceRouter.get("/my-spaces", spaceController.getByUserId);
spaceRouter.get("/:spaceId", spaceController.getById);


spaceRouter.patch("/update/:spaceId", spaceController.update);

spaceRouter.delete("/delete/:spaceId", spaceController.delete);

export default spaceRouter;
