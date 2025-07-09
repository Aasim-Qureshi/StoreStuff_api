import { DeleteInviteDTO } from "../../dtos/invite/DeleteInvite.dto";
import { InviteRepository } from "../../../domain/repositories/Invite.repo";
import { AppError } from "../../../shared/utils/AppError";

export class DeleteInviteUseCase {
    constructor(private inviteRepository: InviteRepository) {}

    async execute(dto: DeleteInviteDTO): Promise<void> {
        const { invitationId, userId } = dto;

        if (!invitationId || !userId) {
            throw new AppError("Invitation ID and User ID are required to delete an invite", 406);
        }

        try {
            await this.inviteRepository.deleteInvite(dto);
        } catch (error) {
            console.error("Error deleting invite:", error);
            throw new AppError("Failed to delete invite", 500);
        }
    }
}
