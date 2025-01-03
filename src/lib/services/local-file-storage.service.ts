import fs from 'fs';
import path from 'path';
import { FileUploadService } from './file-upload.service';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

export class LocalFileUploadService implements FileUploadService {
   private basePath: string;

   constructor(basePath?: string | undefined) {
      this.basePath = basePath ?? path.join(process.cwd(), 'src', 'uploads');
   }

   getBasePath() {
      return this.basePath;
   }

   private generateUniqueFileName(originalFileName: string): string {
      const extname = path.extname(originalFileName);
      const timestamp = Date.now();
      const uniqueId = uuidv4();
      const uniqueFileName = `${uniqueId}-${timestamp}${extname}`;
      return uniqueFileName;
   }

   async saveFile(file: File, destination: string): Promise<string> {
      const directoryPath = path.join(this.basePath, destination);

      if (!fs.existsSync(directoryPath)) {
         fs.mkdirSync(directoryPath, { recursive: true });
      }
      const fileName = this.generateUniqueFileName(file.name);
      const filePath = path.join(directoryPath, fileName);
      const readableStream = Readable.from(file.stream() as any);

      return new Promise((resolve, reject) => {
         const fileStream = fs.createWriteStream(filePath);
         readableStream
            .pipe(fileStream)
            .on('finish', () =>
               resolve(`/api/files/${destination}/${fileName}`)
            )
            .on('error', reject);
      });
   }

   async deleteFile(filePath: string): Promise<void> {
      const fullPath = path.join(
         this.basePath,
         filePath.replace('/api/files/', '')
      );
      return new Promise((resolve, reject) => {
         fs.unlink(fullPath, (err) => {
            if (err) reject(err);
            else resolve();
         });
      });
   }
}
