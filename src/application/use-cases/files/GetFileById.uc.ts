import { FileRepository } from "../../../domain/repositories/File.repo";
import { AppError } from "../../../shared/utils/AppError";
import { FileEntity } from "../../../domain/entities/File.entity"; 

export class GetFileByIdUseCase {
    constructor(private fileRepo: FileRepository) {}

    async execute(fileId: string): Promise<FileEntity | null> {
        if (!fileId) {
            throw new AppError("File ID is required", 406);
        }

        const file = await this.fileRepo.getFileById(fileId);

        if (!file) {
            throw new AppError("File not found", 404);
        }

        return file;
    }
}