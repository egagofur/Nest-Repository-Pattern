import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { PERMISSION_BACKOFFICE_SHOW_PERMISSION } from 'constants/permission.constant';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import { PermissionCrudService } from '../services/permission-crud.service';
import { PermissionMapper } from '../mappers/permission.mapper';
import { PermissionIndexRequest } from '../requests/permission-index.request';
import { PermissionResponse } from '../responses/permission.response';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { IPermission } from 'interface-models/iam/permission.interface';

@Controller('permissions')
export class PermissionController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly permissionCrudService: PermissionCrudService,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_PERMISSION))
    @Get()
    async indexPage(@Query() indexRequest: PermissionIndexRequest): Promise<{
        data: PermissionResponse[];
        meta: IPaginationMeta;
    }> {
        const pagination = await this.permissionCrudService.pagination(
            indexRequest,
        );

        return this.inertiaAdapter.render('Iam/Permissions', {
            data: pagination.data.map((permission) =>
                PermissionMapper.fromEntity(permission),
            ),
            meta: pagination.meta,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_PERMISSION))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<{
        data: IPermission;
    }> {
        const data = await this.permissionCrudService.findById(id);
        return this.inertiaAdapter.render('Iam/Permissions/DetailPermission', {
            data,
        });
    }
}
