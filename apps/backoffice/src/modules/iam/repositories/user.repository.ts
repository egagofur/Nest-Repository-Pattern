import { config } from 'apps/backoffice/src/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthSchemaEnum } from 'apps/backoffice/src/common/enums/auth.enum';
import { LdapService } from '../../auth/services/ldap.service';
import { UserIndexRequest } from '../requests/user-index.request';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly ldapService: LdapService,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async pagination(
        request: UserIndexRequest,
    ): Promise<IPaginateResponse<IUser>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'fullname', 'email'];

        const query = this.createQueryBuilder('user').leftJoinAndSelect(
            'user.roles',
            'role',
        );

        if (request.search) {
            query.where(
                `concat(user.fullname, ' ', user.id, ' ', user.phoneNumber, ' ', user.email) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.created_at) {
            const [startAt, endAt] = request.created_at.split(',');
            query
                .where(`user.createdAt >= :startAt`, {
                    startAt,
                })
                .andWhere(`user.createdAt <= :endAt`, {
                    endAt,
                });
        }

        if (request.gender) {
            query.where(`user.gender = :gender`, {
                gender: `${request.gender}`,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('user.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('user.createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.indexOf(request.sort) >= 0
                    ? `user.${request.sort}`
                    : `user.createdAt`,
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

    async validateUser(email: string, password: string): Promise<IUser> {
        switch (config.auth.schema) {
            case AuthSchemaEnum.Ldap:
                const isValid = this.ldapService.validate(email, password);
                if (isValid) return await this.findOneBy({ email });
                break;

            case AuthSchemaEnum.Local:
                const user = await this.findOneByOrFail({ email });
                const isTrue = await bcrypt.compare(password, user.password);

                if (user && isTrue) {
                    return user;
                }
                break;
        }

        return null;
    }

    async findByRoleExceptIds(
        roleId: number,
        exceptIds: number[],
    ): Promise<IUser[]> {
        return await this.find({
            where: { roles: { id: roleId }, id: Not(In(exceptIds)) },
        });
    }

    async isEmailExists(email: string, exceptId = 0): Promise<boolean> {
        return (
            (await this.findOne({
                where: { email, id: Not(exceptId) },
            })) != null
        );
    }

    async findByIdAndEmail(email: string, id: number): Promise<IUser> {
        const user = await this.findOneOrFail({
            where: { id, email },
            relations: ['roles', 'roles.permissions'],
        });

        return user;
    }

    async bulkDelete(ids: number[]): Promise<void> {
        await this.delete(ids);
    }
}
