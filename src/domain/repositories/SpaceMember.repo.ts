import { AddSpaceMemberDTO } from "../../application/dtos/space-member/AddSpaceMember.dto";
import { UpdateSpaceMemberRoleDTO } from "../../application/dtos/space-member/UpdateSpaceMemberRole.dto";

import { SpaceMemberEntity } from "../entities/SpaceMember.entity";

export interface SpaceMemberRepository {
    
    addMember(data: AddSpaceMemberDTO): Promise<void>;
    getByUserIdAndSpaceId(userId: string, spaceId: string): Promise<SpaceMemberEntity | void>;
    updateMemberRole(data: UpdateSpaceMemberRoleDTO): Promise<void>;
    getMembersBySpaceId(spaceId: string): Promise<SpaceMemberEntity[]>;
    deleteMember(userId: string, spaceId: string): Promise<void>;
}
