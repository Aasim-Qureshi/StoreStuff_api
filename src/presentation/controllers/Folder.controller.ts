import { Request, Response } from "express";

import { FolderRepository } from "../../domain/repositories/Folder.repo";
import { CloudFileHandler } from "../../infrastructure/cloudinary/cloudFileHandler";

import { CreateFolderUseCase } from "../../application/use-cases/folders/CreateFolder.uc";
import { DeleteFolderByIdUseCase } from "../../application/use-cases/folders/DeleteFolder.uc";
import { FindFolderByIdUseCase } from "../../application/use-cases/folders/FindFolderById.uc";
import { FindFolderByPathUseCase } from "../../application/use-cases/folders/FindFolderByPath.uc";
import { FindFolderChildrenUseCase } from "../../application/use-cases/folders/FindFolderChildren.uc";
import { UpdateFolderNameUseCase } from "../../application/use-cases/folders/UpdateFolderName.uc";

import { catchAsync } from "../../shared/utils/CatchAsync";
import { ResponseHandler } from "../../shared/utils/ResponseHandler";

export class FolderController {
  private createFolderUseCase: CreateFolderUseCase;
  private deleteFolderByIdUseCase: DeleteFolderByIdUseCase;
  private findFolderByIdUseCase: FindFolderByIdUseCase;
  private findFolderByPathUseCase: FindFolderByPathUseCase;
  private findChildrenFoldersUseCase: FindFolderChildrenUseCase;
  private updateFolderNameUseCase: UpdateFolderNameUseCase;

  constructor(folderRepo: FolderRepository, cloudFileHandler: CloudFileHandler) {
    this.createFolderUseCase = new CreateFolderUseCase(folderRepo, cloudFileHandler);
    this.deleteFolderByIdUseCase = new DeleteFolderByIdUseCase(folderRepo, cloudFileHandler);
    this.findFolderByIdUseCase = new FindFolderByIdUseCase(folderRepo);
    this.findFolderByPathUseCase = new FindFolderByPathUseCase(folderRepo);
    this.findChildrenFoldersUseCase = new FindFolderChildrenUseCase(folderRepo);
    this.updateFolderNameUseCase = new UpdateFolderNameUseCase(folderRepo);
  }

  createFolder = catchAsync(async (req: Request, res: Response) => {
    const { name, spaceId, folderPath } = req.body;
    const userId = (req as any).userId!;

    const newFolder = await this.createFolderUseCase.execute({
      name,
      spaceId,
      userId,
      folderPath,
    });

    ResponseHandler.success(res, "Folder created successfully", 201, newFolder);
  });

  deleteFolderById = catchAsync(async (req: Request, res: Response) => {
    const { folderId } = req.params;

    await this.deleteFolderByIdUseCase.execute(folderId);
    ResponseHandler.success(res, "Folder deleted successfully", 200, null);
  });

  getFolderById = catchAsync(async (req: Request, res: Response) => {
    const { folderId } = req.params;

    const folder = await this.findFolderByIdUseCase.execute(folderId);
    ResponseHandler.success(res, "Folder retrieved successfully", 200, folder);
  });

  getFolderByPath = catchAsync(async (req: Request, res: Response) => {
    const { folderPath } = req.body;

    console.log("path: ", folderPath);

    const folder = await this.findFolderByPathUseCase.execute(folderPath as string);
    ResponseHandler.success(res, "Folder retrieved successfully", 200, folder);
  });

  getChildrenFolders = catchAsync(async (req: Request, res: Response) => {
    const { spaceId, parentId } = req.body;

    const children = await this.findChildrenFoldersUseCase.execute(spaceId, parentId);
    ResponseHandler.success(res, "Children folders retrieved successfully", 200, children);
  });

  updateFolderName = catchAsync(async (req: Request, res: Response) => {
    const { folderId, name } = req.body;

    const updatedFolder = await this.updateFolderNameUseCase.execute(folderId, name);
    ResponseHandler.success(res, "Folder name updated successfully", 200, updatedFolder);
  });

}
