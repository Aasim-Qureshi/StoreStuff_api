import cloudinary from "../config/cloudinary.config";
import { AppError } from "../../shared/utils/AppError";
import axios from "axios";
import path from "path";
import fs from "fs";


export class CloudFileHandler {
    private uploader = cloudinary.uploader;
    private api = cloudinary.api;
    async uploadFile(
        filePath: string,
        folder?: string,
        publicId?: string,
        type?: string
    ) {
        try {
            const options: any = {
                resource_type: 'auto',
            };

            if (type === 'image') {
                options.resource_type = 'image';
            } else if (type === 'video') {
                options.resource_type = 'video';
            } else if (type === 'pdf' || type === 'document') {
                options.resource_type = 'raw';
            }

            if (folder) {
                options.folder = folder;
            }

            if (publicId) {
                options.public_id = publicId;
            }

            const result = await this.uploader.upload(filePath, options);
            return result;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new AppError('File upload failed', 500);
        }
    }

    async getFile(id: string) {
        try {
            const file = await this.api.resource(id);
            return file;
        } catch (error) {
            console.error('Error fetching file:', error);
            throw new AppError('File not found', 404);
        }
    }

    async deleteFile(fileId: string) {
        console.log("Deleting file with ID: ", fileId);
        const res = await this.uploader.destroy(fileId);
        return res 
    }

    async downloadFile(
        publicId: string,
        expiresInSec = 600,
        asAttachment = true
    ): Promise<string> {
       const info = await this.api.resource(publicId);
        if (!info) {
            throw new AppError('File not found', 404);
        }

      return info.secure_url;
    }



    async createFolder(folderPath: string) {
        try {
            return await this.api.create_folder(folderPath);
        } catch (error) {
            console.error('Error creating folder:', error);
            throw new AppError('Failed to create folder', 500);
        }
    }

    async deleteFolder(folderPath: string) {
        try {
            const resources = await this.api.resources({
                type: 'upload',
                prefix: folderPath,
                max_results: 500
            });

            for (const res of resources.resources) {
                await this.uploader.destroy(res.public_id);
            }

            await this.api.delete_folder(folderPath);
        } catch (error) {
            console.error('Error deleting folder:', error);
            throw new AppError('Failed to delete folder', 500);
        }
    }

    async listFolderContents(folderPath: string) {
        try {
            return await this.api.resources({
                type: 'upload',
                prefix: folderPath
            });
        } catch (error) {
            console.error('Error fetching file:', error);
            throw new AppError('File not found', 404);
        }
    }
}
