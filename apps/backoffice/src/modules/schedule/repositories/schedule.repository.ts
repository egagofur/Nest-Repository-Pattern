import { InjectRepository } from '@nestjs/typeorm';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Repository } from 'typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { Injectable } from '@nestjs/common';
import { MovieSchedule } from 'entities/movie-schedule/movie-schedule.entity';
import { ScheduleIndexRequest } from '../requests/schedule-index.request';

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
}
