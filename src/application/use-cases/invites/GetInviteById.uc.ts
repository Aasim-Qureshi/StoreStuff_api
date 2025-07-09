import { InviteRepository } from "../../../domain/repositories/Invite.repo";
import { AppError } from "../../../shared/utils/AppError";

export class GetInviteByIdUseCase {
    constructor(private inviteRepository: InviteRepository) {}

    async execute(invitationId: string): Promise<any> {
        if (!invitationId) {
            throw new AppError("Invitation ID is required", 406);
        }

        try {
            const invite = await this.inviteRepository.getInviteById(invitationId);

            if (!invite) {
                throw new AppError("Invite not found", 404);
            }

            return invite;
        } catch (error) {
            console.error("Error retrieving invite:", error);
            throw new AppError("Failed to retrieve invite", 500);
        }
    }
}
