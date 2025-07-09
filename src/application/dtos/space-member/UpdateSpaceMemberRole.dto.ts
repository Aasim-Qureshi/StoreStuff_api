import { IRole } from "../../types/IRole";

export class UpdateSpaceMemberRoleDTO {
    constructor(
        public userId: string,
        public spaceId: string,
        public role: IRole
    ) {}
}