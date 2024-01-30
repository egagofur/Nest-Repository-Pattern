import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { config } from 'apps/api/src/config';
import { Queue } from 'bull';
import { ImageUploadService } from '../services/image-upload.service';

@Injectable()
export class CommonApplication {
    constructor(
        @InjectQueue('image-upload-queue') private fileQueue: Queue,
        private readonly imageUploadService: ImageUploadService,
    ) {}

    async uploadGeneral(file: Express.Multer.File): Promise<string> {
        if (file.size > config.upload.image.maxSize.inMb * 1024000) {
            throw new BadRequestException(
                'File yang di upload lebih dari ' +
                    config.upload.image.maxSize.inMb +
                    'MB',
            );
        }

        // Send to queue
        await this.fileQueue.add('doUpload', { file: file });

        // Async return
        const gcsUrl = 'https://storage.googleapis.com';
        const path = file.path.split('/');
        return `${gcsUrl}/${config.storage.gcs.bucketName}/uploads/${
            path[path.length - 1]
        }-compressed-${file.originalname}`;
    }
}
