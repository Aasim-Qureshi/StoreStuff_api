import { InviteEntity } from "../entities/Invite.entity";

import { AcceptInviteDTO } from "../../application/dtos/invite/AcceptInvite.dto";
import { DeleteInviteDTO } from "../../application/dtos/invite/DeleteInvite.dto";
import { SendInviteDTO } from "../../application/dtos/invite/SendInvite.dto";

export interface InviteRepository {
    sendInvite(data: SendInviteDTO): Promise<InviteEntity>;
    getInviteById(invitationId: string): Promise<InviteEntity | null>;
    acceptInvite(data: AcceptInviteDTO): Promise<InviteEntity | null>;
    deleteInvite(data: DeleteInviteDTO): Promise<InviteEntity | null>;
    getInvitesForUser(userId: string): Promise<InviteEntity[]>;
    getInvitesBySpaceIdAndRecipientEmail(spaceId: string, recipientEmail: string): Promise<InviteEntity[]>;
}