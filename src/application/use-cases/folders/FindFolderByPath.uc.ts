import { FolderRepository } from "../../../domain/repositories/Folder.repo";
import { AppError } from "../../../shared/utils/AppError";
import { FolderEntity } from "../../../domain/entities/Folder.entity";

export class FindFolderByPathUseCase {
  constructor(private folderRepo: FolderRepository) {}

  async execute(path: string): Promise<FolderEntity> {

    if (!path) {
      throw new AppError("Folder path is required", 406);
    }

    const folder = await this.folderRepo.findByPath(path);

    if (!folder) {
      throw new AppError("Folder not found", 404);
    }

    return folder;
  }
}
