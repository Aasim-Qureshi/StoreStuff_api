import { SpaceMemberRepository } from "../../../domain/repositories/SpaceMember.repo";
import { SpaceMemberEntity } from "../../../domain/entities/SpaceMember.entity";
import { AppError } from "../../../shared/utils/AppError";

export class GetMembersBySpaceIdUseCase {
    constructor(
        private spaceMemberRepo: SpaceMemberRepository
    ) {}

    async execute(spaceId: string): Promise<SpaceMemberEntity[]> {
        if (!spaceId) {
            throw new AppError("Space ID is required", 406);
        }

        const members = await this.spaceMemberRepo.getMembersBySpaceId(spaceId);

        if (!members || members.length === 0) {
            throw new AppError("No members found for this space", 404);
        }

        return members;
    }
}
