import { AcceptInviteDTO } from "../../dtos/invite/AcceptInvite.dto";
import { InviteRepository } from "../../../domain/repositories/Invite.repo";
import { AddSpaceMemberUseCase } from "../space-members/AddMember.uc";
import { AppError } from "../../../shared/utils/AppError";
import { AddSpaceMemberDTO } from "../../dtos/space-member/AddSpaceMember.dto";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { InviteEntity } from "../../../domain/entities/Invite.entity";

export class AcceptInviteUseCase {
    constructor(
        private inviteRepository: InviteRepository,
        private addSpaceMemberUseCase: AddSpaceMemberUseCase,
        private authRepository: AuthRepository
    ) {}

    async execute(dto: AcceptInviteDTO): Promise<InviteEntity | null> {
        const { invitationId, status } = dto;

        if (!invitationId || !status) {
            throw new AppError("Invitation ID and status are required", 406);
        }

        await this.inviteRepository.acceptInvite(dto);

        const updatedInvite = await this.inviteRepository.getInviteById(invitationId);
        if (!updatedInvite) {
            throw new AppError("Invite not found after update", 404);
        }

        const user = await this.authRepository.findUserByEmail(updatedInvite.recipientEmail);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        console.log("invite found:", updatedInvite);

        if (updatedInvite.status === "accepted") {
            const addMemberData: AddSpaceMemberDTO = {
                userId: user.userId,
                spaceId: updatedInvite.spaceId,
                role: updatedInvite.role
            };

            await this.addSpaceMemberUseCase.execute(addMemberData);
        }
        return updatedInvite;
    }
}
