import { File as IFile } from '@prisma/client';

export class FileEntity implements IFile {
    fileId: string;
    userId: string;
    spaceId: string;
    folderId: string | null;  // updated to match schema
    name: string;
    publicId: string;
    type: string;
    createdAt: Date;
    updatedAt: Date | null;

    constructor(file: IFile) {
        this.fileId = file.fileId;
        this.userId = file.userId;
        this.spaceId = file.spaceId;
        this.folderId = file.folderId;
        this.name = file.name;
        this.publicId = file.publicId;
        this.type = file.type;
        this.createdAt = file.createdAt;
        this.updatedAt = file.updatedAt;
    }
}
