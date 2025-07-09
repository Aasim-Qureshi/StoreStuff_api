import { UpdateSpaceDTO } from "../../dtos/space/UpdateSpace.dto";
import { SpaceEntity } from "../../../domain/entities/Space.entity";

import { SpaceRepository } from "../../../domain/repositories/Space.repo";
import { AppError } from "../../../shared/utils/AppError";

export class UpdateSpaceNameUseCase {
    constructor(private spaceRepo: SpaceRepository) {}

    async execute(data: UpdateSpaceDTO): Promise<SpaceEntity> {
        const { spaceId, spaceName, userId } = data;

        if (!spaceId || !spaceName || !userId) {
            throw new AppError("Space ID, name, and user ID are required", 406);
        }

        const existingSpace = await this.spaceRepo.getSpaceById(spaceId);

        if (!existingSpace) {
            throw new AppError("Space not found", 404);
        }

        if (existingSpace.creatorId !== userId) {
            throw new AppError("You are not allowed to update this space", 403);
        }

        const conflict = await this.spaceRepo.getSpaceBySpaceNameAndCreatorId(spaceName, userId);
        
        if (conflict && conflict.spaceId !== spaceId) {
            throw new AppError("You already have another space with this name", 409);
        }

        const updated = await this.spaceRepo.updateName(data);
        return updated;
    }
}
