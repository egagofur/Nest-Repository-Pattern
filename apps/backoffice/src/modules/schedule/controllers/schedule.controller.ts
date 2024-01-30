import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleIndexRequest } from '../requests/schedule-index.request';
import { ScheduleResponse } from '../responses/schedule.response';
import { ScheduleMapper } from '../mappers/schedule.mapper';
import { ScheduleCreateRequest } from '../requests/schedule-create.request';
import { ScheduleUpdateRequest } from '../requests/scheudle-update.request';
import { MovieService } from '../../movie/services/movie.service';
import { IMovie } from 'apps/backoffice/app/Modules/movie/Entities';

@Controller('movie-schedules')
export class ScheduleController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly scheduleService: ScheduleService,
        private readonly movieService: MovieService,
    ) {}

    @Get()
    async indexPage(@Query() request: ScheduleIndexRequest): Promise<{
        data: ScheduleResponse[];
        meta: IPaginationMeta;
    }> {
        const schedules = await this.scheduleService.pagination(request);

        return this.inertiaAdapter.render('Schedule', {
            data: schedules.data.map((schedule) =>
                ScheduleMapper.fromEntity(schedule),
            ),
            meta: schedules.meta,
        });
    }

    @Get('create')
    async createPage(): Promise<{
        movies: IMovie[];
    }> {
        const movies = await this.movieService.findAll();
        return this.inertiaAdapter.render('Schedule/FormSchedule', {
            movies,
        });
    }

    @Get('edit/:id')
    async editPage(@Param('id') id: number): Promise<{
        data: ScheduleResponse;
        isUpdate: boolean;
    }> {
        const schedule = await this.scheduleService.findByIdSchedule(id);
        const movies = await this.movieService.findAll();
        return this.inertiaAdapter.render('Schedule/FormSchedule', {
            data: ScheduleMapper.fromEntity(schedule),
            movies,
            isUpdate: true,
        });
    }

    @Post('create')
    async create(@Body() movieRequest: ScheduleCreateRequest): Promise<void> {
        await this.scheduleService.create(movieRequest);
        return this.inertiaAdapter.successResponse(
            'movie-schedules',
            'Movie created',
        );
    }

    @Put('edit/:id')
    async update(
        @Param() id: number,
        @Body() movieRequest: ScheduleUpdateRequest,
    ): Promise<void> {
        await this.scheduleService.update(id, movieRequest);
        return this.inertiaAdapter.successResponse(
            'movie-schedules',
            'Movie updated',
        );
    }

    @Delete('delete/:id')
    async delete(@Param() id: number): Promise<void> {
        await this.scheduleService.delete(id);
        return this.inertiaAdapter.successResponse(
            'movie-schedules',
            'Movie deleted',
        );
    }
}
