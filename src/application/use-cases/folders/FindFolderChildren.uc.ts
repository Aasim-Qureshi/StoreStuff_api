import { FolderRepository } from "../../../domain/repositories/Folder.repo";
import { AppError } from "../../../shared/utils/AppError";

import { FolderEntity } from "../../../domain/entities/Folder.entity";
import { FileEntity } from "../../../domain/entities/File.entity";

export class FindFolderChildrenUseCase {
  constructor(private folderRepo: FolderRepository) {}

  async execute(spaceId: string, parentId?: string): Promise<{
    folders: FolderEntity[];
    files: FileEntity[];
  }> {
    if (!spaceId) {
      throw new AppError("Space ID is required", 406);
    }

    // If no parentId provided, assume root-level children
    return await this.folderRepo.findChildren(spaceId, parentId ?? null);
  }
}
