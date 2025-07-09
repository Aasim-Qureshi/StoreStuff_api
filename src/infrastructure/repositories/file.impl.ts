import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

import { FileRepository } from "../../domain/repositories/File.repo";
import { FileEntity } from "../../domain/entities/File.entity";
import { UpdateFileDTO } from "../../application/dtos/file/UpdateFileDTO";

export class FileRepoImpl implements FileRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async uploadFile(file: Omit<FileEntity, 'fileId' | 'createdAt'>): Promise<FileEntity> {

        const uploadedFile = await this.prisma.file.create({
            data: {
                userId: file.userId,
                publicId: file.publicId,
                spaceId: file.spaceId,
                folderId: file.folderId && file.folderId.trim() !== "" ? file.folderId : null,
                name: file.name,
                type: file.type,
                updatedAt: file.updatedAt ?? null,
                createdAt: new Date(),
            },
        });

        return new FileEntity(uploadedFile);
    }

    async getFileById(fileId: string): Promise<FileEntity | null> {
        const file = await this.prisma.file.findUnique({
            where: { fileId },
        });

        return file ? new FileEntity(file) : null;
    }

    async deleteFile(fileId: string): Promise<FileEntity | null> {
        const deletedFile = await this.prisma.file.delete({
            where: { fileId },
        });

        return deletedFile ? new FileEntity(deletedFile) : null;
    }

    async deleteFilesInFolder(folderId: string): Promise<number> {
        const deleted = await this.prisma.file.deleteMany({
            where: {
                folderId,
            },
        });

        return deleted.count;
    }

    async updateFileName(data: UpdateFileDTO): Promise<FileEntity | null> {
        const { fileId, name } = data;

        const updatedFile = await this.prisma.file.update({
            where: { fileId },
            data: { name },
        });

        return updatedFile ? new FileEntity(updatedFile) : null;
    }
}
