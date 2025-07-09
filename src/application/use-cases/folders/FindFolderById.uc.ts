import { FolderRepository } from "../../../domain/repositories/Folder.repo";
import { AppError } from "../../../shared/utils/AppError";
import { FolderEntity } from "../../../domain/entities/Folder.entity";

export class FindFolderByIdUseCase {
  constructor(private folderRepo: FolderRepository) {}

  async execute(folderId: string): Promise<FolderEntity> {
    if (!folderId) {
      throw new AppError("Folder ID is required", 406);
    }

    const folder = await this.folderRepo.findById(folderId);

    if (!folder) {
      throw new AppError("Folder not found", 404);
    }

    return folder;
  }
}
