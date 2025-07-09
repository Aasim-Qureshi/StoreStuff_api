import { Request, Response } from "express";

import { CreateSpaceDTO } from "../../application/dtos/space/CreateSpace.dto";
import { DeleteSpaceDTO } from "../../application/dtos/space/DeleteSpace.dto";
import { UpdateSpaceDTO } from "../../application/dtos/space/UpdateSpace.dto";

import { CreateSpaceUseCase } from "../../application/use-cases/space/CreateSpace.uc";
import { DeleteSpaceUseCase } from "../../application/use-cases/space/DeleteSpace.uc";
import { UpdateSpaceNameUseCase } from "../../application/use-cases/space/UpdateSpace.uc";
import { GetSpaceByIdUseCase } from "../../application/use-cases/space/GetSpaceById.uc";
import { GetSpacesByUserIdUseCase } from "../../application/use-cases/space/GetSpacesByUserId.uc";

import { SpaceRepository } from "../../domain/repositories/Space.repo";
import { SpaceMemberRepository } from "../../domain/repositories/SpaceMember.repo";
import { CloudFileHandler } from "../../infrastructure/cloudinary/cloudFileHandler";

import { catchAsync } from "../../shared/utils/CatchAsync";
import { ResponseHandler } from "../../shared/utils/ResponseHandler";
import { FolderRepository } from "../../domain/repositories/Folder.repo";

export class SpaceController {
    private createSpaceUseCase: CreateSpaceUseCase;
    private deleteSpaceUseCase: DeleteSpaceUseCase;
    private updateSpaceNameUseCase: UpdateSpaceNameUseCase;
    private getSpaceByIdUseCase: GetSpaceByIdUseCase;
    private getSpacesByUserIdUseCase: GetSpacesByUserIdUseCase; // ← Add this

    constructor(spaceRepo: SpaceRepository, spaceMemberRepo: SpaceMemberRepository, cloudFileHandler: CloudFileHandler, folderRepo: FolderRepository) {
        this.createSpaceUseCase = new CreateSpaceUseCase(spaceRepo, spaceMemberRepo, cloudFileHandler, folderRepo);
        this.deleteSpaceUseCase = new DeleteSpaceUseCase(spaceRepo, spaceMemberRepo, cloudFileHandler);
        this.updateSpaceNameUseCase = new UpdateSpaceNameUseCase(spaceRepo);
        this.getSpaceByIdUseCase = new GetSpaceByIdUseCase(spaceRepo);
        this.getSpacesByUserIdUseCase = new GetSpacesByUserIdUseCase(spaceRepo);
    }



    create = catchAsync(async (req: Request, res: Response) => {
        const { spaceName } = req.body;
        const creatorId = (req as any).userId!;

        console.log("creatorId:", creatorId)

        const dto = new CreateSpaceDTO(spaceName, creatorId);
        const space = await this.createSpaceUseCase.execute(dto);

        ResponseHandler.success(res, "Space created successfully", 201, space);
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const { spaceId } = req.params;
        const { spaceName } = req.body;
        const userId = (req as any).userId!;

        console.log("spaceId:", spaceId)
        console.log("spaceName:", spaceName)
        console.log("userId:", userId)


        const dto = new UpdateSpaceDTO(spaceId, spaceName, userId);
        const updated = await this.updateSpaceNameUseCase.execute(dto);

        ResponseHandler.success(res, "Space updated successfully", 200, updated);
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const { spaceId } = req.params;

        const userId = (req as any).userId!;

        const dto = new DeleteSpaceDTO(spaceId, userId);
        await this.deleteSpaceUseCase.execute(dto);

        ResponseHandler.success(res, "Space deleted successfully", 200, null);
    });

    getById = catchAsync(async (req: Request, res: Response) => {
        const { spaceId } = req.params;
        const space = await this.getSpaceByIdUseCase.execute(spaceId);

        ResponseHandler.success(res, "Space retrieved successfully", 200, space);
    });

    getByUserId = catchAsync(async (req: Request, res: Response) => {
        const userId = (req as any).userId!;

        const spaces = await this.getSpacesByUserIdUseCase.execute(userId);

        ResponseHandler.success(res, "Spaces retrieved successfully", 200, spaces);
    });

}