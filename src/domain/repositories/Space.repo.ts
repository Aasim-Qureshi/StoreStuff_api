import { SpaceEntity } from "../entities/Space.entity";

import { CreateSpaceDTO } from "../../application/dtos/space/CreateSpace.dto";
import { UpdateSpaceDTO } from "../../application/dtos/space/UpdateSpace.dto";

export interface SpaceRepository {
    create(space: CreateSpaceDTO): Promise<SpaceEntity>;
    delete(sid: string): Promise<SpaceEntity>;
    updateFolderId(spaceId: string, folderId: string): Promise<SpaceEntity>; updateName(space: UpdateSpaceDTO): Promise<SpaceEntity>;
    getSpaceById(sid: string): Promise<SpaceEntity | null>;
    getSpaceBySpaceNameAndCreatorId(username: string, uid: string): Promise<SpaceEntity | null>;
    getSpacesByUserId(uid: string): Promise<SpaceEntity[]>;
}
