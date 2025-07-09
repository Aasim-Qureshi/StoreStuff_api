export class AcceptInviteDTO {
    constructor(
        public invitationId: string,
        public status: "accepted" | "rejected"
    ){}
}