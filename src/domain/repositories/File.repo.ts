import { UpdateFileDTO } from '../../application/dtos/file/UpdateFileDTO';
import { FileEntity } from '../entities/File.entity';

export interface FileRepository {
    uploadFile(file: Omit<FileEntity, 'fileId' | 'createdAt'>): Promise<FileEntity>;
    getFileById(fileId: string): Promise<FileEntity | null>;
    deleteFile(fileId: string): Promise<FileEntity | null>;
    deleteFilesInFolder(folderPath: string): Promise<number>;
    updateFileName(data: UpdateFileDTO): Promise<FileEntity | null>;
  }