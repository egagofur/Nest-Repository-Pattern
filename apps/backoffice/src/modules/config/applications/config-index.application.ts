import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';
import { Config } from 'entities/config/config.entity';
import { Repository } from 'typeorm';
import { ConfigIndexRequest } from '../requests/config-index.request';

const ALLOW_TO_SORT = ['latest', 'oldest', 'name', 'key', 'value'];

@Injectable()
export class ConfigIndexApplication extends PaginateUtil {
    constructor(
        @InjectRepository(Config)
        private readonly configRepository: Repository<Config>,
        private readonly cacheService: CacheService,
    ) {
        super();
    }

    async fetch(
        request: ConfigIndexRequest,
    ): Promise<IPaginateResponse<Config>> {
        const query = this.configRepository.createQueryBuilder('config');

        if (request.search) {
            query.where(
                `concat(config.name, ' ', config.id, ' ', config.value) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.sort == 'latest') {
            query.orderBy('createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.indexOf(request.sort) >= 0
                    ? request.sort
                        ? `config.${request.sort}`
                        : `config.${ALLOW_TO_SORT[0]}`
                    : `config.createdAt`,
                this.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.countOffset(request));

        const [data, count] = await query.getManyAndCount();
        const meta = this.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }
}
