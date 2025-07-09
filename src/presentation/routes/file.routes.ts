import { Router } from "express";
import { FileController } from "../controllers/File.controller";
import { FileRepoImpl } from "../../infrastructure/repositories/file.impl";
import { CloudFileHandler } from "../../infrastructure/cloudinary/cloudFileHandler";
import { upload } from "../../shared/middleware/multer.middlware";

const fileRepo = new FileRepoImpl();
const cloudHandler = new CloudFileHandler();
const fileController = new FileController(fileRepo, cloudHandler);

const fileRouter = Router();

fileRouter.post("/upload", upload.single("file"), fileController.uploadFile);
fileRouter.patch("/update", fileController.updateFileName);

fileRouter.get("/get/:fileId", fileController.getFileById);
fileRouter.get("/download", fileController.downloadFile);

fileRouter.delete("/delete/:fileId", fileController.deleteFile);

export default fileRouter;
