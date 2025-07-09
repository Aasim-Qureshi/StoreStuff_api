import { SpaceEntity } from "../../../domain/entities/Space.entity";
import { SpaceRepository } from "../../../domain/repositories/Space.repo";
import { AppError } from "../../../shared/utils/AppError";

export class GetSpaceByIdUseCase {
    constructor(private spaceRepo: SpaceRepository) {}

    async execute(spaceId: string): Promise<SpaceEntity> {
        if (!spaceId) {
            throw new AppError("Space ID is required", 400);
        }

        const space = await this.spaceRepo.getSpaceById(spaceId);

        if (!space) {
            throw new AppError("Space not found", 404);
        }

        return space;
    }
}
