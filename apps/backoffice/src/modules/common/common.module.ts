import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'apps/backoffice/src/config';
import path from 'path';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { CommonController } from './controllers/common.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
        MulterModule.register({
            dest: path.resolve('./') + '/dist/' + config.assets.temp,
        }),
    ],
    controllers: [CommonController],
    providers: [InertiaAdapter],
})
export class CommonModule {}
