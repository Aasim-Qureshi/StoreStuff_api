import { SpaceMemberRepository } from "../../../domain/repositories/SpaceMember.repo";
import { AppError } from "../../../shared/utils/AppError";

export class DeleteSpaceMemberUseCase {
    constructor(
        private spaceMemberRepo: SpaceMemberRepository
    ) {}

    async execute(userId: string, spaceId: string): Promise<void> {
        if (!userId || !spaceId) {
            throw new AppError("User ID and Space ID are required", 406);
        }

        const existingMember = await this.spaceMemberRepo.getByUserIdAndSpaceId(userId, spaceId);
        if (!existingMember) {
            throw new AppError("User is not a member of this space", 404);
        }

        await this.spaceMemberRepo.deleteMember(userId, spaceId);
    }
}