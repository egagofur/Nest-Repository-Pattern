import { Injectable } from '@nestjs/common';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { ScheduleIndexRequest } from '../requests/schedule-index.request';
import { IMovieSchedule } from 'interface-models/movie-schedule/movie-schedule.interface';
import { ScheduleCreateRequest } from '../requests/schedule-create.request';
import { ScheduleUpdateRequest } from '../requests/scheudle-update.request';
import { MovieSchedule } from 'entities/movie-schedule/movie-schedule.entity';

@Injectable()
export class ScheduleService {
    constructor(private readonly scheduleRepository: ScheduleRepository) {}

    async pagination(
        request: ScheduleIndexRequest,
    ): Promise<IPaginateResponse<IMovieSchedule>> {
        return this.scheduleRepository.pagination(request);
    }

    async findByIdSchedule(id: number): Promise<MovieSchedule> {
        return this.scheduleRepository.findOne({
            where: { id },
            relations: ['movieId'],
        });
    }

    async create(schedule: ScheduleCreateRequest): Promise<void> {
        this.scheduleRepository.create(schedule);
        this.scheduleRepository.save(schedule);
    }

    async update(id: number, schedule: ScheduleUpdateRequest): Promise<void> {
        const status = this.scheduleRepository.update(id, schedule);
        if ((await status).affected < 1) {
            throw new Error('Schedule not change');
        }
    }

    async delete(id: number): Promise<void> {
        const status = this.scheduleRepository.delete(id);
        if ((await status).affected < 1) {
            throw new Error('Schedule not found');
        }
    }
}
