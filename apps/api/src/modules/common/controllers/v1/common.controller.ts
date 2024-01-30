import {
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    Req,
    Inject,
} from '@nestjs/common';
import { generateRandomCode, Utils } from 'apps/api/src/common/utils/util';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CommonGenerateCodeDto } from '../../dto/common-generate-code.dto';
import { LoggedInGuard } from '../../../auth/guards/logged-in.guard';
import { Request } from 'express';
import { IApiResponse } from 'apps/api/src/common/interface/response.interface';
import { CommonApplication } from '../../applications/common.application';
import { UserService } from '../../../user/services/user.service';
import { REQUEST } from '@nestjs/core';

@Controller('commons')
@UseGuards(LoggedInGuard)
export class CommonController {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly commonApplication: CommonApplication,
        private readonly userService: UserService,
    ) {}

    @Post('/upload-photo')
    @UseInterceptors(FileInterceptor('photo'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
        const fileUrl = await this.commonApplication.uploadGeneral(file);

        return {
            data: {
                fileUrl,
            },
            message: 'Success Upload',
            meta: null,
        };
    }

    @Post('/upload-photos')
    @UseInterceptors(FilesInterceptor('photo'))
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

    @Get('/generate-code')
    @UseGuards(LoggedInGuard)
    async generateRandomProductCode(
        @Req() req: Request,
        @Query() query: CommonGenerateCodeDto,
    ): Promise<IApiResponse<any>> {
        const timeNow = new Date();
        const id = req.user['id'];

        const fourDigitCombination = String(
            timeNow.getFullYear() +
                timeNow.getMonth() +
                timeNow.getDate() +
                timeNow.getHours() +
                timeNow.getMinutes() +
                timeNow.getSeconds() +
                Number(id),
        );

        const code =
            query.prefixProduct.slice(0, 3).toUpperCase() +
            '-' +
            fourDigitCombination +
            generateRandomCode();

        return {
            data: {
                code,
            },
            message: 'Success generate code',
        };
    }
}
