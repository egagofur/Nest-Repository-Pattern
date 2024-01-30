import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { LogActivityIndexRequest } from '../requests/log-activity-index.request';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';

@Injectable()
export class LogActivityRepository extends Repository<LogActivity> {
    constructor(
        @InjectRepository(LogActivity)
        private readonly repo: Repository<LogActivity>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async pagination(
        request: LogActivityIndexRequest,
    ): Promise<IPaginateResponse<ILogActivity>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'menu'];
        const query = this.createQueryBuilder('logActivity').leftJoinAndSelect(
            'logActivity.user',
            'user',
        );

        if (request.search) {
            query.andWhere(
                `concat(logActivity.activity, ' ', logActivity.menu, ' ', logActivity.path) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.start_at && request.end_at) {
            query.andWhere(
                `CAST(logActivity.createdAt as DATE) BETWEEN CAST(:startAt AS DATE) AND CAST(:endAt AS DATE)`,
                {
                    startAt: request.start_at,
                    endAt: request.end_at,
                },
            );
        }

        if (request.menu) {
            query.andWhere(`logActivity.menu = :menu`, {
                menu: request.menu,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.includes(request.sort)
                    ? `logActivity.${request.sort}`
                    : `logActivity.createdAt`,
                this.paginationUtil.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.paginationUtil.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.paginationUtil.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    async createLog(data: ILogActivity): Promise<void> {
        const newLog = this.create(data);
        await this.save(newLog);
    }
}
