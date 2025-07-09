import { SpaceMember as ISpaceMember } from "@prisma/client";
import { IRole } from "../../application/types/IRole";


export class SpaceMemberEntity implements ISpaceMember{
    spaceId: string;
    userId: string;
    roles: IRole;
    joinDate: Date;

    constructor(spaceMember: ISpaceMember) {
        this.spaceId = spaceMember.spaceId;
        this.userId = spaceMember.userId;
        this.roles = spaceMember.roles as IRole;
        this.joinDate = spaceMember.joinDate;
    }
}