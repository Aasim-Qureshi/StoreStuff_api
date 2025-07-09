import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

import { FolderRepository } from "../../domain/repositories/Folder.repo";
import { FolderEntity } from "../../domain/entities/Folder.entity";
import { FileEntity } from "../../domain/entities/File.entity";

export class FolderRepoImpl implements FolderRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async create(folder: FolderEntity): Promise<FolderEntity> {
        const createdFolder = await this.prisma.folder.create({
            data: {
                name: folder.name,
                spaceId: folder.spaceId,
                userId: folder.userId,
                parentId: folder.parentId ?? null,
                folderPath: folder.folderPath,
                createdAt: folder.createdAt || new Date(),
                updatedAt: folder.updatedAt ?? null,
            },
        });

        return new FolderEntity(createdFolder);
    }

    async updateSpaceId(folderId: string, spaceId: string): Promise<void> {
        await this.prisma.folder.update({
            where: { folderId },
            data: { spaceId },
        });
    }


    async findById(folderId: string): Promise<FolderEntity | null> {
        const folder = await this.prisma.folder.findUnique({
            where: { folderId },
        });

        return folder ? new FolderEntity(folder) : null;
    }

    async findChildren(
        spaceId: string,
        parentId: string | null
    ): Promise<{ folders: FolderEntity[]; files: FileEntity[] }> {
        let folders;

        if (parentId === null) {
            // 1. Get the root folder ID of the space (i.e., the one you want to skip)
            const space = await this.prisma.space.findUnique({
                where: { spaceId },
                select: { folderId: true },
            });

            folders = await this.prisma.folder.findMany({
                where: {
                    spaceId,
                    parentId: null,
                    folderId: { not: space?.folderId ?? undefined },
                },
                orderBy: { createdAt: "asc" },
            });
        } else {
            folders = await this.prisma.folder.findMany({
                where: {
                    spaceId,
                    parentId,
                },
                orderBy: { createdAt: "asc" },
            });
        }
        const files = await this.prisma.file.findMany({
            where: {
                spaceId,
                folderId: parentId,
            },
            orderBy: { createdAt: "asc" },
        });

        return {
            folders: folders.map((f) => new FolderEntity(f)),
            files: files.map((f) => new FileEntity(f)),
        };
    }

    async findByPath(folderPath: string): Promise<FolderEntity | null> {
        const folder = await this.prisma.folder.findUnique({
            where: { folderPath },
        });

        return folder ? new FolderEntity(folder) : null;
    }


    async deleteById(folderId: string): Promise<void> {

        await this.prisma.file.deleteMany({
            where: { folderId },
        });

        await this.prisma.folder.delete({
            where: { folderId },
        });
    }

    async updateFolderName(folderId: string, name: string): Promise<FolderEntity> {
        const updatedFolder = await this.prisma.folder.update({
            where: { folderId },
            data: { name, updatedAt: new Date() },
        });

        return new FolderEntity(updatedFolder);
    }
}
