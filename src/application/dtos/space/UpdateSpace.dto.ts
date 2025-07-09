export class UpdateSpaceDTO {
    constructor(
        public spaceId: string,
        public spaceName: string,
        public userId: string
    ){}
}