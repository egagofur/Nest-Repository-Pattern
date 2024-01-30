import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { LogActivityController } from './controllers/log-activity.controller';
import { LogActivityService } from './services/log-activity.service';
import { LogActivityRepository } from './repositories/log-activity.repository';
import { PaginateUtil } from '../../common/utils/paginate.util';

@Module({
    imports: [TypeOrmModule.forFeature([LogActivity])],
    controllers: [LogActivityController],
    providers: [
        InertiaAdapter,
        PaginateUtil,
        LogActivityService,
        LogActivityRepository,
    ],
    exports: [LogActivityService],
})
export class LogActivityModule {}
