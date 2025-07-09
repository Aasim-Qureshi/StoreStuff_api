import { InviteEntity } from "../../../domain/entities/Invite.entity";
import { SendInviteDTO } from "../../dtos/invite/SendInvite.dto";
import { InviteRepository } from "../../../domain/repositories/Invite.repo";

import { AppError } from "../../../shared/utils/AppError";

export class SendInviteUseCase {
    constructor(private inviteRepository: InviteRepository) {}

    async execute(dto: SendInviteDTO): Promise<InviteEntity> {
        const { recepientEmail, spaceId, role } = dto;

        if (!recepientEmail || !spaceId || !role) {
            throw new AppError("All fields are required to send an invite", 406);
        }

        const existingInvite = await this.inviteRepository.getInvitesBySpaceIdAndRecipientEmail(spaceId, recepientEmail);
        if (existingInvite.length > 0) {
            throw new AppError("An invite already exists for this user in this space", 409);
        }

        try {
            const invite = await this.inviteRepository.sendInvite(dto);
            return invite;
            
        } catch (error) {
            console.error("Error sending invite:", error);
            throw new AppError("Failed to send invite", 500);
        }
    }
}
