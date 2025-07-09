import { Request, Response } from "express";

import { AddSpaceMemberDTO } from "../../application/dtos/space-member/AddSpaceMember.dto";
import { UpdateSpaceMemberRoleDTO } from "../../application/dtos/space-member/UpdateSpaceMemberRole.dto";

import { AddSpaceMemberUseCase } from "../../application/use-cases/space-members/AddMember.uc";
import { DeleteSpaceMemberUseCase } from "../../application/use-cases/space-members/DeleteMember.uc";
import { GetMembersBySpaceIdUseCase } from "../../application/use-cases/space-members/GetMembersBySpaceId.uc";
import { UpdateSpaceMemberRoleUseCase } from "../../application/use-cases/space-members/UpdateMemberRole.uc";

import { SpaceMemberRepository } from "../../domain/repositories/SpaceMember.repo";
import { AuthRepository } from "../../domain/repositories/Auth.repo";

import { catchAsync } from "../../shared/utils/CatchAsync";
import { ResponseHandler } from "../../shared/utils/ResponseHandler";

export class SpaceMemberController {
    private addMemberUC: AddSpaceMemberUseCase;
    private deleteMemberUC: DeleteSpaceMemberUseCase;
    private getMembersUC: GetMembersBySpaceIdUseCase;
    private updateRoleUC: UpdateSpaceMemberRoleUseCase;

    constructor(spaceMemberRepo: SpaceMemberRepository, authRepo: AuthRepository) {
        this.addMemberUC = new AddSpaceMemberUseCase(spaceMemberRepo, authRepo);
        this.deleteMemberUC = new DeleteSpaceMemberUseCase(spaceMemberRepo);
        this.getMembersUC = new GetMembersBySpaceIdUseCase(spaceMemberRepo);
        this.updateRoleUC = new UpdateSpaceMemberRoleUseCase(spaceMemberRepo);
    }

    addMember = catchAsync(async (req: Request, res: Response) => {
        const { userEmail, spaceId, role } = req.body;
        const dto = new AddSpaceMemberDTO(userEmail, spaceId, role);

        await this.addMemberUC.execute(dto);

        ResponseHandler.success(res, "Member added to space", 201, null);
    });

    deleteMember = catchAsync(async (req: Request, res: Response) => {
        const { userId, spaceId } = req.params;

        await this.deleteMemberUC.execute(userId, spaceId);

        ResponseHandler.success(res, "Member removed from space", 200, null);
    });

    getMembers = catchAsync(async (req: Request, res: Response) => {
        const { spaceId } = req.params;

        const members = await this.getMembersUC.execute(spaceId);

        ResponseHandler.success(res, "Members retrieved successfully", 200, members);
    });

    updateMemberRole = catchAsync(async (req: Request, res: Response) => {
        const { userId, spaceId, role } = req.body;
        const dto = new UpdateSpaceMemberRoleDTO(userId, spaceId, role);

        await this.updateRoleUC.execute(dto);

        ResponseHandler.success(res, "Member role updated successfully", 200, null);
    });
}
