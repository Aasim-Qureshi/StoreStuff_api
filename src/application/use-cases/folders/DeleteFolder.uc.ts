import { FolderRepository } from "../../../domain/repositories/Folder.repo";
import { CloudFileHandler } from "../../../infrastructure/cloudinary/cloudFileHandler";
import { AppError } from "../../../shared/utils/AppError";

export class DeleteFolderByIdUseCase {
  constructor(
    private folderRepo: FolderRepository,
    private cloudFileHandler: CloudFileHandler
  ) {}

  async execute(folderId: string): Promise<void> {

    if (!folderId) {
      throw new AppError("Folder ID is required", 406);
    }

    const folder = await this.folderRepo.findById(folderId);
    if (!folder) {
      throw new AppError("Folder not found", 404);
    }

    await this.cloudFileHandler.deleteFolder(folder.folderPath);
    await this.folderRepo.deleteById(folderId);
  }
}
