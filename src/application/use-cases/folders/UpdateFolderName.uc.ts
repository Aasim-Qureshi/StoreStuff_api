import { FolderRepository } from "../../../domain/repositories/Folder.repo";
import { AppError } from "../../../shared/utils/AppError";

import { FolderEntity } from "../../../domain/entities/Folder.entity";

export class UpdateFolderNameUseCase {
  constructor(private folderRepo: FolderRepository) {}

  async execute(folderId: string, newName: string): Promise<FolderEntity> {
    if (!folderId || !newName) {
      throw new AppError("Folder ID and new name are required", 406);
    }

    const updatedFolder = await this.folderRepo.updateFolderName(folderId, newName);
    if (!updatedFolder) {
      throw new AppError("Folder not found or update failed", 404);
    }

    return updatedFolder;
  }
}