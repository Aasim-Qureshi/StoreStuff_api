export class AddMemberDTO {
    constructor(
        public spaceId: string,
        public memberId: string,
        public role: "viewer" | "admin" | "editor"
    ){}
}