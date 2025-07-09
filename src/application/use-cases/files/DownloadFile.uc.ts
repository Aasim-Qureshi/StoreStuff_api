import { CloudFileHandler } from "../../../infrastructure/cloudinary/cloudFileHandler";
import { AppError } from "../../../shared/utils/AppError";

export class DownloadFileUseCase {
    constructor(private cloudFileHandler: CloudFileHandler) {}

    async execute(publicId: string): Promise<string> {
        if (!publicId) {
            throw new AppError("Public ID is required", 406);
        }

        try {
            const downloadUrl = await this.cloudFileHandler.downloadFile(publicId);
            return downloadUrl;
        } catch (error) {
            console.error("Error downloading file:", error);
            throw new AppError("Failed to download file", 500);
        }
    }
}