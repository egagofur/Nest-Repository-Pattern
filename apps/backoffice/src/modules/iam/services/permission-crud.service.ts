import { Injectable } from '@nestjs/common';
import { IPermission } from 'interface-models/iam/permission.interface';
import { PermissionRepository } from '../repositories/permission.repository';
import { config } from 'apps/backoffice/src/config';
import { PermissionIndexRequest } from '../requests/permission-index.request';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { CacheGetSet } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-get-set.decorator';

@Injectable()
export class PermissionCrudService {
    constructor(private readonly permissionRepository: PermissionRepository) {}

    @CacheGetSet(config.cache.name.permissions.list)
    async pagination(
        request: PermissionIndexRequest,
    ): Promise<IPaginateResponse<IPermission>> {
        return this.permissionRepository.pagination(request);
    }

    @CacheGetSet(config.cache.name.permissions.detail)
    async findById(id: number): Promise<IPermission> {
        const results = await this.permissionRepository.findOneOrFail({
            where: { id },
            relations: ['roles'],
        });

        return results;
    }

    async findAll(): Promise<IPermission[]> {
        const results = await this.permissionRepository.find();
        return results;
    }
}
