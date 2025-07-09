import { FileRepository } from "../../../domain/repositories/File.repo";
import { CloudFileHandler } from "../../../infrastructure/cloudinary/cloudFileHandler";
import { AppError } from "../../../shared/utils/AppError";
import { FileEntity } from "../../../domain/entities/File.entity"; // assuming this exists

export class DeleteFileUseCase {
    constructor(
      private cloudFileHandler: CloudFileHandler,
      private fileRepo: FileRepository
    ) {}
  
    async execute(fileId: string): Promise<FileEntity | null> {
      if (!fileId) {
        throw new AppError("File ID is required", 406);
      }
  
      const existingFile = await this.fileRepo.getFileById(fileId);
  
      if (!existingFile) {
        throw new AppError("File not found in database", 404);
      }
  
      try {
        const cloudDeleteResult = await this.cloudFileHandler.deleteFile(existingFile.publicId);
  
        if (cloudDeleteResult.result !== "ok") {
          throw new AppError("Cloud file deletion failed", 500);
        }
  
        await this.fileRepo.deleteFile(fileId);
  
        return existingFile;
      } catch (error) {
        console.error("Error deleting file:", error);
        throw new AppError("Failed to delete file", 500);
      }
    }
  }
  
