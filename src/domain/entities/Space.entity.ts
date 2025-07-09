import { Space as ISpace } from "@prisma/client";

export class SpaceEntity implements ISpace {
    spaceId: string;
    creatorId: string;
    name: string;
    createdAt: Date;
    folderId: string | null;

    constructor(space: ISpace) {
        this.spaceId = space.spaceId;
        this.creatorId = space.creatorId;
        this.name = space.name;
        this.createdAt = space.createdAt;
        this.folderId = space.folderId; 
    }
}