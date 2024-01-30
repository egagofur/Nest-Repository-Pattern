import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from 'entities/iam/role.entity';
import { Repository } from 'typeorm';
import { RoleIndexRequest } from '../requests/role-index.request';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';

/* Write your complex queries here
 * If your query is simple, you can use the repository directly for minimization of code
 */
@Injectable()
export class RoleRepository extends Repository<Role> {
    constructor(
        @InjectRepository(Role)
        private readonly repo: RoleRepository,
        private readonly paginateUtil: PaginateUtil,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async pagination(
        request: RoleIndexRequest,
    ): Promise<IPaginateResponse<IRole>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'name', 'key'];

        const query = this.createQueryBuilder('role');

        if (request.search) {
            query.where(
                `concat(role.name, ' ', role.key, ' ', role.id) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.sort == 'latest') {
            query.orderBy('role.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('role.createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.indexOf(request.sort) >= 0
                    ? request.sort
                        ? `role.${request.sort}`
                        : `role.${ALLOW_TO_SORT[0]}`
                    : `role.createdAt`,
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

    async findRoleByKeyAndId(key: string, id: number): Promise<IRole> {
        const role = await this.findOne({
            where: {
                key,
                id,
            },
            relations: ['permissions'],
        });

        return role;
    }

    async isRoleExistsByKey(key: string): Promise<boolean> {
        const role = await this.findOne({
            where: {
                key,
            },
        });

        return role != null;
    }
}
