import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from 'entities/iam/role.entity';
import { RoleCreateRequest } from '../requests/role-create.request';
import { RoleRepository } from '../repositories/role.repository';
import { RoleEditRequest } from '../requests/role-edit.request';
import { config } from 'apps/backoffice/src/config';
import { CacheClear } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-clear.decorator';
import { PermissionRepository } from '../repositories/permission.repository';
import { CacheGetSet } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-get-set.decorator';
import { RoleIndexRequest } from '../requests/role-index.request';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';

@Injectable()
export class RoleCrudService {
    constructor(
        private readonly roleRepository: RoleRepository,
        private readonly permissionRepository: PermissionRepository,
    ) {}

    @CacheGetSet(config.cache.name.roles.list)
    async pagination(
        request: RoleIndexRequest,
    ): Promise<IPaginateResponse<IRole>> {
        return this.roleRepository.pagination(request);
    }

    @CacheClear(config.cache.name.roles.list)
    @CacheClear(config.cache.name.roles.detail)
    async create(roleRequest: RoleCreateRequest): Promise<IRole> {
        const isRoleExists = await this.roleRepository.isRoleExistsByKey(
            roleRequest.key,
        );
        if (isRoleExists) {
            throw new UnprocessableEntityException(
                `Role ${roleRequest.key} has already exists`,
            );
        }

        const permissions = await this.permissionRepository.findByIds(
            roleRequest.permissions,
        );

        const roleCreate = new Role();

        roleCreate.name = roleRequest.name;
        roleCreate.key = roleRequest.key;
        roleCreate.permissions = permissions;

        return await this.roleRepository.save(roleCreate);
    }

    @CacheClear(config.cache.name.roles.detail)
    async edit(id: number, roleRequest: RoleEditRequest): Promise<IRole> {
        const roleExists = await this.roleRepository.findRoleByKeyAndId(
            roleRequest.key,
            id,
        );

        if (!roleExists) {
            throw new UnprocessableEntityException(
                `Role ${roleRequest.key} is not exists`,
            );
        }

        const permissions = await this.permissionRepository.findByIds(
            roleRequest.permissionIds,
        );

        roleExists.name = roleRequest.name;
        roleExists.key = roleRequest.key;
        roleExists.permissions = permissions;

        return await this.roleRepository.save(roleExists);
    }

    @CacheClear(config.cache.name.roles.detail)
    async delete(id: number): Promise<void> {
        await this.roleRepository.findOneBy({ id });
        await this.roleRepository.delete(id);
    }

    async findById(id: number): Promise<IRole> {
        const results = await this.roleRepository.findOne({
            where: { id },
            relations: ['permissions'],
        });
        return results;
    }

    async findByKey(key: string): Promise<IRole> {
        const results = await this.roleRepository.findOneBy({ key });
        return results;
    }

    async findAll(): Promise<IRole[]> {
        const results = await this.roleRepository.find();
        return results;
    }
}
