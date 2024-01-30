import { InjectRepository } from '@nestjs/typeorm';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { QueryFailedError, Repository } from 'typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { Injectable } from '@nestjs/common';
import { MovieSchedule } from 'entities/movie-schedule/movie-schedule.entity';
import { ScheduleIndexRequest } from '../requests/schedule-index.request';
import { ScheduleCreateRequest } from '../requests/schedule-create.request';
import { ScheduleUpdateRequest } from '../requests/scheudle-update.request';

@Injectable()
export class ScheduleRepository extends Repository<MovieSchedule> {
    constructor(
        @InjectRepository(MovieSchedule)
        private readonly repo: ScheduleRepository,
        private readonly paginateUtil: PaginateUtil,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async pagination(
        request: ScheduleIndexRequest,
    ): Promise<IPaginateResponse<MovieSchedule>> {
        const query = this.createQueryBuilder('schedule').leftJoinAndSelect(
            'schedule.movieId',
            'movie',
        );

        if (request.search) {
            query.where(`concat(schedule.id) like :search`, {
                search: `%${request.search}%`,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('schedule.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('schedule.createdAt', 'ASC');
        } else if (request.sort == 'price') {
            query.orderBy('schedule.price', 'ASC');
        }

        query.take(request.perPage ?? 10);
        query.skip(this.paginateUtil.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.paginateUtil.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    async createSchedule(data: ScheduleCreateRequest): Promise<void> {
        const schedule = this.create(data);
        await this.save(schedule);
    }

    async updateSchdule(
        id: number,
        data: ScheduleUpdateRequest,
    ): Promise<void> {
        const status = await this.update(id, data);
        if (status.affected < 1) {
            throw new QueryFailedError('Error data not changed', null, null);
        }
    }

    async deleteSchdule(id: number): Promise<void> {
        const status = await this.delete(id);
        if (status.affected < 1) {
            throw new QueryFailedError('Error data not deleted', null, null);
        }
    }
}
