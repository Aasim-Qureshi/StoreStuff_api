import { SpaceMemberRepository } from "../../../domain/repositories/SpaceMember.repo";
import { AppError } from "../../../shared/utils/AppError";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { AddSpaceMemberDTO } from "../../dtos/space-member/AddSpaceMember.dto";

export class AddSpaceMemberUseCase {
    constructor(
        private spaceMemberRepo: SpaceMemberRepository,
        private authRepo: AuthRepository
    ) {}

    async execute(data: AddSpaceMemberDTO): Promise<void> {
        const { userId, spaceId, role } = data;

        if (!userId || !spaceId || !role) {
            throw new AppError("User ID, Space ID and Role are required", 406);
        }

        const user = await this.authRepo.findUserById(userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const existingMember = await this.spaceMemberRepo.getByUserIdAndSpaceId(userId, spaceId);
        if (existingMember) {
            throw new AppError("User is already a member of this space", 409);
        }


        return await this.spaceMemberRepo.addMember({
            userId,
            spaceId,
            role
        });
    }
}
