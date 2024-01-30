import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginateUtil } from '../../common/utils/paginate.util';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { MovieSchedule } from 'entities/movie-schedule/movie-schedule.entity';
import { ScheduleService } from './services/schedule.service';
import { ScheduleRepository } from './repositories/schedule.repository';
import { ScheduleController } from './controllers/schedule.controller';
import { MovieModule } from '../movie/movie.module';

@Module({
    imports: [TypeOrmModule.forFeature([MovieSchedule]), MovieModule],
    providers: [
        ScheduleService,
        ScheduleRepository,
        PaginateUtil,
        InertiaAdapter,
    ],
    controllers: [ScheduleController],
    exports: [ScheduleService],
})
export class MovieScheduleModule {}
