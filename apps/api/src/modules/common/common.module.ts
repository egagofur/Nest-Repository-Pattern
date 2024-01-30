import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../../config';
import path from 'path';
import { CommonController } from './controllers/v1/common.controller';
import { CommonApplication } from './applications/common.application';
import { ImageUploadService } from './services/image-upload.service';
import { UserModule } from '../user/user.module';
import { BullModule } from '@nestjs/bull';
import { FileUploadProcessor } from './applications/queue-consumer';
import { Config } from 'entities/config/config.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Config]),
        MulterModule.register({
            dest: path.resolve('./') + '/dist/' + config.assets.temp,
        }),
        UserModule,
        BullModule.registerQueue({
            name: 'image-upload-queue',
        }),
    ],
    controllers: [CommonController],
    providers: [CommonApplication, ImageUploadService, FileUploadProcessor],
})
export class CommonModule {}
