import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

import { AddSpaceMemberDTO } from "../../application/dtos/space-member/AddSpaceMember.dto";
import { UpdateSpaceMemberRoleDTO } from "../../application/dtos/space-member/UpdateSpaceMemberRole.dto";

import { SpaceMemberEntity } from "../../domain/entities/SpaceMember.entity";
import { SpaceMemberRepository } from "../../domain/repositories/SpaceMember.repo";

export class SpaceMemberRepoImpl implements SpaceMemberRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async addMember(data: AddSpaceMemberDTO): Promise<void> {
        await this.prisma.spaceMember.create({
            data: {
                userId: data.userId,
                spaceId: data.spaceId,
                roles: data.role
            }
        });
    }

    async getByUserIdAndSpaceId(userId: string, spaceId: string): Promise<SpaceMemberEntity | void> {
        const member = await this.prisma.spaceMember.findUnique({
            where: {

                spaceId_userId: {
                    spaceId: spaceId,
                    userId: userId
                }
            }
        });

        return member as SpaceMemberEntity | void;
    }

    async updateMemberRole(data: UpdateSpaceMemberRoleDTO): Promise<void> {
        await this.prisma.spaceMember.update({
            where: {

                spaceId_userId: {
                    spaceId: data.spaceId,
                    userId: data.userId
                }
            },
            data: {
                roles: data.role
            }
        });
    }

    async getMembersBySpaceId(spaceId: string): Promise<SpaceMemberEntity[]> {
        const members = await this.prisma.spaceMember.findMany({
            where: { spaceId: spaceId }
        });

        return members as SpaceMemberEntity[];
    }

    async deleteMember(userId: string, spaceId: string): Promise<void> {
        await this.prisma.spaceMember.delete({
            where: {
                spaceId_userId: {
                    spaceId: spaceId,
                    userId: userId
                }
            }
        });
    }
}
