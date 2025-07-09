import { Router } from "express";

import { FolderRepoImpl } from "../../infrastructure/repositories/folder.impl";
import { CloudFileHandler } from "../../infrastructure/cloudinary/cloudFileHandler";
import { FolderController } from "../controllers/Folder.controller";

const folderRepo = new FolderRepoImpl();
const cloudHandler = new CloudFileHandler();
const folderController = new FolderController(folderRepo, cloudHandler);

const folderRouter = Router();

folderRouter.post("/create", folderController.createFolder);
folderRouter.get("/get/:folderId", folderController.getFolderById);
folderRouter.get("/path", folderController.getFolderByPath);
folderRouter.post("/children", folderController.getChildrenFolders);
folderRouter.delete("/delete/:folderId", folderController.deleteFolderById);
folderRouter.patch("/update", folderController.updateFolderName);

export default folderRouter;
