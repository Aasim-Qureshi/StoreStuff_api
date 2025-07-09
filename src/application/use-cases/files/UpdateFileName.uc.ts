import { FileRepository } from "../../../domain/repositories/File.repo";
import { AppError } from "../../../shared/utils/AppError";

import { UpdateFileDTO } from "../../dtos/file/UpdateFileDTO";
import { FileEntity } from "../../../domain/entities/File.entity";  

export class UpdateFileName {
    constructor(private fileRepo: FileRepository) {}

    async execute(data: UpdateFileDTO): Promise<FileEntity | null> {
        if (!data.fileId || !data.name) {
            throw new AppError("File ID and name are required", 406);
        }

        const file = await this.fileRepo.updateFileName(data);

        if (!file) {
            throw new AppError("File not found", 404);
        }

        return file;
    }
}