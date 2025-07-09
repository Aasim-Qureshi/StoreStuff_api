import { InviteRepository } from "../../../domain/repositories/Invite.repo";
import { AppError } from "../../../shared/utils/AppError";

export class GetInvitesForUserUseCase {
    constructor(private inviteRepository: InviteRepository) {}

    async execute(recepientEmail: string): Promise<any> {
        if (!recepientEmail) {
            throw new AppError("Email is required to fetch invites", 406);
        }

        try {
            const invites = await this.inviteRepository.getInvitesForUser(recepientEmail);
            return invites;
        } catch (error) {
            console.error("Error fetching invites for user:", error);
            throw new AppError("Failed to fetch invites for user", 500);
        }
    }
}
