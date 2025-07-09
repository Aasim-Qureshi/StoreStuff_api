import { UpdateSpaceMemberRoleDTO } from "../../dtos/space-member/UpdateSpaceMemberRole.dto";
import { SpaceMemberRepository } from "../../../domain/repositories/SpaceMember.repo";
import { AppError } from "../../../shared/utils/AppError";

export class UpdateSpaceMemberRoleUseCase {
    constructor(
        private spaceMemberRepo: SpaceMemberRepository
    ) {}

    async execute(data: UpdateSpaceMemberRoleDTO): Promise<void> {
        const { userId, spaceId, role } = data;

        if (!userId || !spaceId || !role) {
            throw new AppError("User ID, Space ID, and Role are required", 406);
        }

        const existingMember = await this.spaceMemberRepo.getByUserIdAndSpaceId(userId, spaceId);
        if (!existingMember) {
            throw new AppError("Space member not found", 404);
        }

        await this.spaceMemberRepo.updateMemberRole({
            userId,
            spaceId,
            role
        });
    }
}
