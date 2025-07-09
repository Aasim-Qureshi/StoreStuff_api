import { CreateSpaceDTO } from "../../dtos/space/CreateSpace.dto";
import { SpaceEntity } from "../../../domain/entities/Space.entity";
import { CloudFileHandler } from "../../../infrastructure/cloudinary/cloudFileHandler";

import { SpaceRepository } from "../../../domain/repositories/Space.repo";
import { SpaceMemberRepository } from "../../../domain/repositories/SpaceMember.repo";
import { FolderRepository } from "../../../domain/repositories/Folder.repo";

import { AppError } from "../../../shared/utils/AppError";
import { IRole } from "../../types/IRole";
import { FolderEntity } from "../../../domain/entities/Folder.entity";

export class CreateSpaceUseCase {
  constructor(
    private spaceRepo: SpaceRepository,
    private spaceMemberRepo: SpaceMemberRepository,
    private cloudFileHandler: CloudFileHandler,
    private folderRepo: FolderRepository
  ) {}

  async execute(data: CreateSpaceDTO): Promise<SpaceEntity> {
    const { spaceName, creatorId } = data;

    if (!spaceName || !creatorId) {
      throw new AppError("Space name and user ID are required", 406);
    }

    const existing = await this.spaceRepo.getSpaceBySpaceNameAndCreatorId(spaceName, creatorId);
    if (existing) {
      throw new AppError("You already have a space with this name", 409);
    }

    const folderPath = `/spaces/${spaceName}`;
    await this.cloudFileHandler.createFolder(folderPath);

    try {
      const space = await this.spaceRepo.create({
        ...data,
      });

      const folder = await this.folderRepo.create(
        new FolderEntity({
          name: spaceName,
          userId: creatorId,
          spaceId: space.spaceId, 
          folderPath,
          parentId: null,
          createdAt: new Date(),
          updatedAt: null,
          folderId: "",
        })
      );

      await this.spaceRepo.updateFolderId(space.spaceId, folder.folderId);

      await this.spaceMemberRepo.addMember({
        userId: creatorId,
        spaceId: space.spaceId,
        role: IRole.ADMIN,
      });

      return {
        ...space,
        folderId: folder.folderId,
      };
    } catch (error) {
      await this.cloudFileHandler.deleteFolder(folderPath);
      throw error;
    }
  }
}
