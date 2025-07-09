export class SendInviteDTO {
    constructor(
        public recepientEmail: string,
        public spaceId: string,
        public role: "viewer" | "admin" | "editor"
    ){}
}