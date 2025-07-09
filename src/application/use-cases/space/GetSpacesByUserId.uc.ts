import { SpaceEntity } from "../../../domain/entities/Space.entity";
import { SpaceRepository } from "../../../domain/repositories/Space.repo";
import { AppError } from "../../../shared/utils/AppError";

export class GetSpacesByUserIdUseCase {
    constructor(private spaceRepo: SpaceRepository) {}

    async execute(userId: string): Promise<SpaceEntity[]> {
        if (!userId) {
            throw new AppError("User ID is required", 400);
        }

        const spaces = await this.spaceRepo.getSpacesByUserId(userId);

        // Instead of throwing error, return empty array if no spaces found
        return spaces || [];
    }
}
