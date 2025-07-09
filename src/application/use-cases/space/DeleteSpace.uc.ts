import { DeleteSpaceDTO } from "../../dtos/space/DeleteSpace.dto";
import { SpaceRepository } from "../../../domain/repositories/Space.repo";
import { SpaceMemberRepository } from "../../../domain/repositories/SpaceMember.repo";
import { CloudFileHandler } from "../../../infrastructure/cloudinary/cloudFileHandler";
import { AppError } from "../../../shared/utils/AppError";
import { ICloudFile } from "../../types/ICloudFile";

interface FolderContentsResponse {
    resources: ICloudFile[];
}

export class DeleteSpaceUseCase {
    constructor(
        private spaceRepo: SpaceRepository,
        private spaceMemberRepo: SpaceMemberRepository,
        private cloudFileHandler: CloudFileHandler
    ) { }

    async execute(data: DeleteSpaceDTO): Promise<void> {
        const membership = await this.spaceMemberRepo.getByUserIdAndSpaceId(data.userId, data.spaceId);

        if (!membership) {
            throw new AppError("You're not a member of this space", 403);
        }

        if (membership.roles !== "admin") {
            throw new AppError("Only the owner can delete the space", 403);
        }

        const space = await this.spaceRepo.getSpaceById(data.spaceId);
        if (!space) throw new AppError("Space not found", 404);

        const folderPath = `spaces/${space.name}`;

        try {
            const files: FolderContentsResponse = await this.cloudFileHandler.listFolderContents(folderPath);

            const deletePromises: Promise<void>[] = files.resources.map((file: ICloudFile) =>
                this.cloudFileHandler.deleteFile(file.public_id)
            );

            await Promise.all(deletePromises);

            await this.spaceRepo.delete(data.spaceId);

            await this.cloudFileHandler.deleteFolder(folderPath);

        } catch (error) {
            console.error("Atomic deletion failed:", error);

            if (error instanceof Error) {
                throw new AppError(`Space deletion failed: ${error.message}`, 500);
            }
            throw new AppError("Space deletion failed due to unknown error", 500);
        }
    }
}