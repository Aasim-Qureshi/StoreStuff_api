import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

import { CreateSpaceDTO } from "../../application/dtos/space/CreateSpace.dto";
import { UpdateSpaceDTO } from "../../application/dtos/space/UpdateSpace.dto";

import { SpaceRepository } from "../../domain/repositories/Space.repo";
import { SpaceEntity } from "../../domain/entities/Space.entity";

export class SpaceRepoImpl implements SpaceRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async create(space: CreateSpaceDTO): Promise<SpaceEntity> {
        const newSpace = this.prisma.space.create({
            data: {
                name: space.spaceName,
                creatorId: space.creatorId,
                folderId: space.folderId,
            }
        })
        return newSpace
    }

    async updateFolderId(spaceId: string, folderId: string): Promise<SpaceEntity> {
        return this.prisma.space.update({
            where: { spaceId },
            data: { folderId },
        });
    }

    async updateName(space: UpdateSpaceDTO): Promise<SpaceEntity> {
        const updatedSpace = await this.prisma.space.update({
            where: { spaceId: space.spaceId },
            data: { name: space.spaceName }
        })

        return updatedSpace;
    }

    async delete(sid: string): Promise<SpaceEntity> {
        const deletedSpace = await this.prisma.space.delete({
            where: { spaceId: sid }
        })

        return deletedSpace;
    }

    async getSpaceById(sid: string): Promise<SpaceEntity | null> {
        const space = await this.prisma.space.findUnique({
            where: { spaceId: sid }
        })

        return space;
    }

    async getSpaceBySpaceNameAndCreatorId(spaceName: string, creatorId: string): Promise<SpaceEntity | null> {
        const space = await this.prisma.space.findFirst({
            where: {
                name: spaceName,
                creatorId: creatorId
            }
        });

        return space;
    }

    async getSpacesByUserId(userId: string): Promise<SpaceEntity[]> {
        const spaces = await this.prisma.space.findMany({
            where: {
                OR: [
                    { creatorId: userId },
                    {
                        members: {
                            some: { userId }
                        }
                    }
                ]
            },
            include: {
                members: {
                    where: { userId },
                    select: {
                        roles: true
                    }
                }
            }
        });

        return spaces


    }
}