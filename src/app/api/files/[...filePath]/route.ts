import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { LocalFileUploadService } from '@/lib/services/local-file-storage.service';

export async function GET(
   req: Request,
   { params }: { params: Promise<{ filePath: string[] }> }
) {
   try {
      const { filePath } = await params;
      const fileUploadService = new LocalFileUploadService();
      const uploadsDir = fileUploadService.getBasePath();
      const fileFullPath = path.join(uploadsDir, ...filePath);

      if (!fs.existsSync(fileFullPath)) {
         return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }

      const fileBuffer = fs.readFileSync(fileFullPath);
      const extname = path.extname(filePath[filePath.length - 1]).toLowerCase();
      const mimeTypes: { [key: string]: string } = {
         '.jpg': 'image/jpeg',
         '.jpeg': 'image/jpeg',
         '.png': 'image/png',
         '.gif': 'image/gif',
         '.webp': 'image/webp',
         '.svg': 'image/svg+xml',
      };

      const mimeType = mimeTypes[extname] || 'application/octet-stream';

      return new NextResponse(fileBuffer, {
         status: 200,
         headers: {
            'Content-Type': mimeType,
         },
      });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
      );
   }
}
