export interface UploadFileDTO {
    filePath: string;
    folderId?: string;
    userId: string;
    spaceId: string;
    name: string;
    type: string;
    cloudPath?: string; // Optional, used for cloud storage paths
  }
  