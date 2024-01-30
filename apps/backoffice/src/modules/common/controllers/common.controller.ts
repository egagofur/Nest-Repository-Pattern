import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('commons')
export class CommonController {
    @Post('/upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
        const fileUrl = await Utils.moveFile(
            file.path,
            'uploads/' + Date.now() + '-' + file.originalname,
        );

        return {
            data: {
                fileUrl,
            },
            message: 'Success Upload',
            meta: null,
        };
    }

    @Post('/upload-files')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadFiles(
        @UploadedFiles() files: Express.Multer.File[],
    ): Promise<any> {
        const fileUrls = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileUrl = await Utils.moveFile(
                file.path,
                'uploads/' + Date.now() + '-' + file.originalname,
            );

            fileUrls.push(fileUrl);
        }

        return {
            data: { fileUrls },
            message: 'Success Upload Files',
            meta: null,
        };
    }
}
