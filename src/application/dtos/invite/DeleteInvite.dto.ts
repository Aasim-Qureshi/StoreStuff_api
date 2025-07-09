export class DeleteInviteDTO {
    constructor(
        public invitationId: string,
        public userId: string
    ){}
}