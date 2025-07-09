import { IRole } from "../../types/IRole";

export class AddSpaceMemberDTO {
    constructor(
        public userId: string,
        public spaceId: string,
        public role: IRole
    ) {}
}
