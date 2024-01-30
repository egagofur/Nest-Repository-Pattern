import { Repository } from 'typeorm';
import { PermissionIndexRequest } from '../requests/permission-index.request';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { IPermission } from 'interface-models/iam/permission.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { Injectable } from '@nestjs/common';
import { Permission } from 'entities/iam/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';

/* Write your complex queries here
 * If your query is simple, you can use the repository directly for minimization of code
 */
@Injectable()
export class PermissionRepository extends Repository<Permission> {
    constructor(
        @InjectRepository(Permission)
        private readonly repo: PermissionRepository,
        private readonly paginateUtil: PaginateUtil,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async pagination(
        request: PermissionIndexRequest,
    ): Promise<IPaginateResponse<IPermission>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'name', 'key'];

        const query = this.createQueryBuilder('permission');

        if (request.search) {
            query.where(
                `concat(permission.name, ' ', permission.key, ' ', permission.id) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.sort == 'latest') {
            query.orderBy('permission.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('permission.createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.indexOf(request.sort) >= 0
                    ? request.sort
                        ? `permission.${request.sort}`
                        : `permission.${ALLOW_TO_SORT[0]}`
                    : `permission.createdAt`,
                this.paginateUtil.getOrder(request.order),
            );
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
