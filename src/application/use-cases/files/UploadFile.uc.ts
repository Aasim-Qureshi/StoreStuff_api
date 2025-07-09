import { CloudFileHandler } from "../../../infrastructure/cloudinary/cloudFileHandler";
import { FileRepository } from "../../../domain/repositories/File.repo";
import { UploadFileDTO } from "../../dtos/file/UploadFileDTO";
import fs from 'fs';

export class UploadFileUseCase {
    constructor(
        private cloudFileHandler: CloudFileHandler,
        private fileRepo: FileRepository
    ) { }

    async execute(data: UploadFileDTO): Promise<any> {
        const { filePath, userId, spaceId, folderId, name, type, cloudPath } = data;

        try {
            const uploaded = await this.cloudFileHandler.uploadFile(
                filePath,
                cloudPath,       
                undefined,
                type
            );

            if (!uploaded?.public_id) {
                throw new Error("Upload to Cloudinary failed: No public_id received.");
            }

            const fileData = {
                publicId: uploaded.public_id,
                userId,
                spaceId,
                folderId: folderId ?? null,
                name,
                type,
                createdAt: new Date(),
                updatedAt: null,
            };

            const newFile = await this.fileRepo.uploadFile(fileData);

            if (filePath && fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }

            return newFile;
        } catch (error) {
            if (filePath && fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }
            throw error;
        }
    }
}
