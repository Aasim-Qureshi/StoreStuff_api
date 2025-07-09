import { Request, Response } from "express";

import { UploadFileUseCase } from "../../application/use-cases/files/UploadFile.uc";
import { DeleteFileUseCase } from "../../application/use-cases/files/DeleteFile.uc";
import { GetFileByIdUseCase } from "../../application/use-cases/files/GetFileById.uc";
import { DownloadFileUseCase } from "../../application/use-cases/files/DownloadFile.uc";

import { FileRepository } from "../../domain/repositories/File.repo";
import { CloudFileHandler } from "../../infrastructure/cloudinary/cloudFileHandler";

import { catchAsync } from "../../shared/utils/CatchAsync";
import { ResponseHandler } from "../../shared/utils/ResponseHandler";
import { UpdateFileName } from "../../application/use-cases/files/UpdateFileName.uc";

export class FileController {
    private uploadFileUseCase: UploadFileUseCase;
    private deleteFileUseCase: DeleteFileUseCase;
    private getFileByIdUseCase: GetFileByIdUseCase;
    private updateFileNameUseCase: UpdateFileName;
    private downloadFileUseCase: DownloadFileUseCase;

    constructor(fileRepo: FileRepository, cloudFileHandler: CloudFileHandler) {
        this.uploadFileUseCase = new UploadFileUseCase(cloudFileHandler, fileRepo);
        this.deleteFileUseCase = new DeleteFileUseCase(cloudFileHandler, fileRepo);
        this.getFileByIdUseCase = new GetFileByIdUseCase(fileRepo);
        this.updateFileNameUseCase = new UpdateFileName(fileRepo);
        this.downloadFileUseCase = new DownloadFileUseCase(cloudFileHandler);
    }

    uploadFile = catchAsync(async (req: Request, res: Response) => {
        const { spaceId, folderId, name, type, cloudPath } = req.body;
        const userId = (req as any).userId!;
      
        if (!req.file) {
          res.status(400).json({ message: "No file uploaded" });
          return;
        }
      
        const filePath = req.file.path;

        console.log("File path: ", filePath);
      
        const uploadedFile = await this.uploadFileUseCase.execute({
          userId,
          spaceId,
          folderId,
          name,
          type,
          filePath,
          cloudPath
        });
      
        ResponseHandler.success(res, "File uploaded successfully", 201, uploadedFile);
      });

      deleteFile = catchAsync(async (req: Request, res: Response) => {
        const { fileId } = req.params;    
        const deletedFile = await this.deleteFileUseCase.execute(fileId);
    
        ResponseHandler.success(res, "File deleted successfully", 200, deletedFile);
      });

      getFileById = catchAsync(async (req: Request, res: Response) => {
        const { fileId } = req.params;
    
        const file = await this.getFileByIdUseCase.execute(fileId);       
        ResponseHandler.success(res, "File retrieved successfully", 200, file);
      }); 

      updateFileName = catchAsync(async (req: Request, res: Response) => {
        const { fileId, name } = req.body;
    
        const updatedFile = await this.updateFileNameUseCase.execute({ fileId, name });
        ResponseHandler.success(res, "File name updated successfully", 200, updatedFile);
      });

      downloadFile = catchAsync(async (req: Request, res: Response) => {
        const publicId = req.query.publicId as string;

        console.log("Public ID: ", publicId);

        const downloadUrl = await this.downloadFileUseCase.execute(publicId);
        ResponseHandler.success(res, "File download URL retrieved successfully", 200, downloadUrl);
      });
}
