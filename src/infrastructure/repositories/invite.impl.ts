import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

import { SendInviteDTO } from "../../application/dtos/invite/SendInvite.dto";
import { AcceptInviteDTO } from "../../application/dtos/invite/AcceptInvite.dto";
import { DeleteInviteDTO } from "../../application/dtos/invite/DeleteInvite.dto";

import { InviteEntity } from "../../domain/entities/Invite.entity";
import { InviteRepository } from "../../domain/repositories/Invite.repo";

export class InviteRepoImpl implements InviteRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async sendInvite(dto: SendInviteDTO): Promise<InviteEntity> {
        const invite = await this.prisma.invitation.create({
            data: {
                recipientEmail: dto.recepientEmail,
                spaceId: dto.spaceId,
                status: 'pending',
                role: dto.role
            }
        });

        return new InviteEntity(invite);
    }

    async acceptInvite(dto: AcceptInviteDTO): Promise<InviteEntity> {

        console.log("Accepting invite with DTO:", dto);

        const invite = await this.prisma.invitation.update({
            where: {
                invitationId: dto.invitationId
            },
            data: {
                status: dto.status
            }
        });

        return new InviteEntity(invite);
    }

    async deleteInvite(dto: DeleteInviteDTO): Promise<InviteEntity | null> {
        const deletedInvite = await this.prisma.invitation.delete({
            where: {
                invitationId: dto.invitationId
            }
        });

        return deletedInvite ? new InviteEntity(deletedInvite) : null;
    }

    async getInviteById(invitationId: string): Promise<InviteEntity | null> {
        const invite = await this.prisma.invitation.findUnique({
            where: {
                invitationId: invitationId
            }
        });

        return invite ? new InviteEntity(invite) : null;
    }

    async getInvitesBySpaceIdAndRecipientEmail(spaceId: string, recipientEmail: string): Promise<InviteEntity[]> {
        const invites = await this.prisma.invitation.findMany({
            where: {
                spaceId,
                recipientEmail
            }
        });
        return invites.map(invite => new InviteEntity(invite));
    }

    async getInvitesForUser(recipientEmail: string): Promise<InviteEntity[]> {
        const invites = await this.prisma.invitation.findMany({
            where: {
                recipientEmail
            }
        });

        return invites.map(invite => new InviteEntity(invite));
    }
}
