import { Request, Response } from "express";

import { SendInviteDTO } from "../../application/dtos/invite/SendInvite.dto";
import { AcceptInviteDTO } from "../../application/dtos/invite/AcceptInvite.dto";
import { DeleteInviteDTO } from "../../application/dtos/invite/DeleteInvite.dto";

import { SendInviteUseCase } from "../../application/use-cases/invites/SendInvite.uc";
import { AcceptInviteUseCase } from "../../application/use-cases/invites/AcceptInvite.uc";
import { DeleteInviteUseCase } from "../../application/use-cases/invites/DeleteInvite.uc";
import { GetInvitesForUserUseCase } from "../../application/use-cases/invites/GetInvitesForUser.uc";
import { AddSpaceMemberUseCase } from "../../application/use-cases/space-members/AddMember.uc";

import { InviteRepository } from "../../domain/repositories/Invite.repo";
import { SpaceMemberRepository } from "../../domain/repositories/SpaceMember.repo";
import { AuthRepository } from "../../domain/repositories/Auth.repo";

import { catchAsync } from "../../shared/utils/CatchAsync";
import { ResponseHandler } from "../../shared/utils/ResponseHandler";

export class InviteController {
    private sendInviteUC: SendInviteUseCase;
    private acceptInviteUC: AcceptInviteUseCase;
    private deleteInviteUC: DeleteInviteUseCase;
    private getInvitesForUserUC: GetInvitesForUserUseCase;
    private addSpaceMemberUC: AddSpaceMemberUseCase;

    constructor(
        inviteRepo: InviteRepository,
        spaceMemberRepo: SpaceMemberRepository,
        authRepo: AuthRepository
    ) {
        this.sendInviteUC = new SendInviteUseCase(inviteRepo);
        this.addSpaceMemberUC = new AddSpaceMemberUseCase(spaceMemberRepo, authRepo); 
        this.acceptInviteUC = new AcceptInviteUseCase(inviteRepo, this.addSpaceMemberUC, authRepo); 
        this.deleteInviteUC = new DeleteInviteUseCase(inviteRepo);
        this.getInvitesForUserUC = new GetInvitesForUserUseCase(inviteRepo);
    }

    sendInvite = catchAsync(async (req: Request, res: Response) => {
        const { recipientEmail, spaceId, role } = req.body;
        const dto = new SendInviteDTO(recipientEmail, spaceId, role);

        const invitation = await this.sendInviteUC.execute(dto);

        ResponseHandler.success(res, "Invite sent successfully", 201, invitation);
    });

    acceptInvite = catchAsync(async (req: Request, res: Response) => {
        const { invitationId, status } = req.body;
        const dto = new AcceptInviteDTO(invitationId, status);

        const invite = await this.acceptInviteUC.execute(dto);

        ResponseHandler.success(res, "Invite accepted successfully", 200, invite);
    });

    deleteInvite = catchAsync(async (req: Request, res: Response) => {
        const { invitationId, userId } = req.params;
        const dto = new DeleteInviteDTO(invitationId, userId);

        await this.deleteInviteUC.execute(dto);

        ResponseHandler.success(res, "Invite deleted successfully", 200, null);
    });

    getInvitesForUser = catchAsync(async (req: Request, res: Response) => {
        const { userEmail } = req.params;

        console.log("Fetching invites for user:", userEmail);
        const invites = await this.getInvitesForUserUC.execute(userEmail);
        console.log("Invites retrieved:", invites);

        ResponseHandler.success(res, "Invites retrieved successfully", 200, invites);
    });
}
