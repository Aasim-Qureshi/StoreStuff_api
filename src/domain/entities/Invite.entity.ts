import { Invitation as IInvitation } from "@prisma/client";
import { IRole } from "../../application/types/IRole";

export class InviteEntity implements IInvitation {
    invitationId: string;
    spaceId: string;
    recipientEmail: string;
    status: 'pending' | 'accepted' | 'rejected';
    role: IRole;

    constructor(invitation: IInvitation){
        this.invitationId = invitation.invitationId; 
        this.spaceId = invitation.spaceId; 
        this.recipientEmail = invitation.recipientEmail; 
        this.status = invitation.status as 'pending' | 'accepted' | 'rejected'; // ✅ correct
        this.role = invitation.role as IRole;
    }
}
