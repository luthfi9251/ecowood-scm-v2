export interface FileUploadService {
   saveFile(file: File, destination: string): Promise<string>;
   deleteFile(filePath: string): Promise<void>;
}
