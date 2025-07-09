import { FolderRepository } from "../../../domain/repositories/Folder.repo";
import { AppError } from "../../../shared/utils/AppError";
import { FolderEntity } from "../../../domain/entities/Folder.entity";
import { CreateFolderDTO } from "../../dtos/folder/CreateFolder.dto";
import { CloudFileHandler } from "../../../infrastructure/cloudinary/cloudFileHandler";

export class CreateFolderUseCase {
  constructor(
    private folderRepo: FolderRepository,
    private cloudFileHandler: CloudFileHandler
  ) {}

  async execute(data: CreateFolderDTO): Promise<FolderEntity> {
    const { name, spaceId, userId, folderPath } = data;

    if (!name || !spaceId || !userId || !folderPath) {
      throw new AppError("Missing required fields", 406);
    }

    let parentId: string | null = null;

    // Optional: check if this folder is nested inside another
    const parentFolder = await this.folderRepo.findByPath(folderPath);
    if (parentFolder) {
      parentId = parentFolder.folderId;
    }

    // Construct full cloud path
    const cloudPath = `${folderPath}/${name}`;

    // Create folder in Cloudinary
    try {
      await this.cloudFileHandler.createFolder(cloudPath);
    } catch (error) {
      console.error("Cloudinary folder creation failed:", error);
      throw new AppError("Cloud folder creation failed", 500);
    }

    // Create folder in DB
    const newFolder = new FolderEntity({
      name,
      spaceId,
      userId,
      folderPath: cloudPath,
      parentId, // will be null if creating under root
      createdAt: new Date(),
      updatedAt: null,
      folderId: "",
    });

    return await this.folderRepo.create(newFolder);
  }
}
