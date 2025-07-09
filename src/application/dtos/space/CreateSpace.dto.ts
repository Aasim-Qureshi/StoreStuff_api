export class CreateSpaceDTO {
    constructor(
        public spaceName: string,
        public creatorId: string,
        public spaceId?: string,
        public folderId?: string
    ){}
}