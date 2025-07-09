import { FolderEntity } from '../entities/Folder.entity';
import { FileEntity } from '../entities/File.entity';

export interface FolderRepository {
  create(folder: FolderEntity): Promise<FolderEntity>;
  findById(folderId: string): Promise<FolderEntity | null>;
  findChildren(spaceId: string, parentId: string | null): Promise<{folders: FolderEntity[], files: FileEntity[]}>;
  updateSpaceId(folderId: string, spaceId: string): Promise<void>;
  findByPath(folderPath: string): Promise<FolderEntity | null>;
  deleteById(folderId: string): Promise<void>;
  updateFolderName(folderId: string, newName: string): Promise<FolderEntity>;
}
