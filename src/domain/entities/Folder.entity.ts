import { Folder as IFolder } from '@prisma/client';

export class FolderEntity implements IFolder {
    folderId: string;
    name: string;
    spaceId: string;
    userId: string;
    parentId: string | null;
    folderPath: string;
    createdAt: Date;
    updatedAt: Date | null;

    constructor(folder: IFolder) {
        this.folderId = folder.folderId;
        this.name = folder.name;
        this.spaceId = folder.spaceId;
        this.userId = folder.userId;
        this.parentId = folder.parentId;
        this.folderPath = folder.folderPath;
        this.createdAt = folder.createdAt;
        this.updatedAt = folder.updatedAt;
    }
}
