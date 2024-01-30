import { Process, Processor } from '@nestjs/bull';
import { Utils } from 'apps/api/src/common/utils/util';
import { Job } from 'bull';
import { ImageUploadService } from '../services/image-upload.service';

@Processor('image-upload-queue')
export class FileUploadProcessor {
    constructor(private readonly imageUploadService: ImageUploadService) {}

    @Process('doUpload')
    async processFile(job: Job) {
        const file = job.data.file;

        const compressedFilePath =
            await this.imageUploadService.compressDefault(file);
        const fileName =
            compressedFilePath.split('/')[
                compressedFilePath.split('/').length - 1
            ];
        const destPath = 'uploads/' + fileName;
        const nameFile = await Utils.moveFile(compressedFilePath, destPath);
        console.log('[ Queue doUpload executed ] - Sucess ', nameFile);
    }
}
