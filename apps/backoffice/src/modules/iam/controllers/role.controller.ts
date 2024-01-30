import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { RoleCrudService } from '../services/role-crud.service';
import { RoleCreateRequest } from '../requests/role-create.request';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { RoleIndexRequest } from '../requests/role-index.request';
import { RoleEditRequest } from '../requests/role-edit.request';
import { PermissionGuard } from '../../auth/guards/permission.guard';
import {
    PERMISSION_BACKOFFICE_CREATE_ROLE,
    PERMISSION_BACKOFFICE_DELETE_ROLE,
    PERMISSION_BACKOFFICE_SHOW_ROLE,
    PERMISSION_BACKOFFICE_UPDATE_ROLE,
} from 'constants/permission.constant';
import { RoleMapper } from '../mappers/role.mapper';
import { UserCrudService } from '../services/user-crud.service';
import { PermissionCrudService } from '../services/permission-crud.service';
import { RoleResponse } from '../responses/role.response';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { IPermission } from 'interface-models/iam/permission.interface';
import { IRole } from 'apps/backoffice/app/Modules/Role/Entities';
import { IUser } from 'apps/backoffice/app/Modules/Profile/Entities';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly roleCrudService: RoleCrudService,
        private readonly userCrudService: UserCrudService,
        private readonly permissionCrudService: PermissionCrudService,
    ) {}

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_ROLE))
    @Get()
    async indexPage(@Query() indexRequest: RoleIndexRequest): Promise<{
        data: RoleResponse[];
        meta: IPaginationMeta;
    }> {
        const props = await this.roleCrudService.pagination(indexRequest);
        return this.inertiaAdapter.render('Iam/Roles', {
            data: props.data.map((role) => RoleMapper.fromEntity(role)),
            meta: props.meta,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_ROLE))
    @Get('create')
    async createPage(): Promise<{
        permissions: IPermission[];
    }> {
        const permissions = await this.permissionCrudService.findAll();
        return this.inertiaAdapter.render('Iam/Roles/CreateRole', {
            permissions,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_SHOW_ROLE))
    @Get(':id')
    async detailPage(@Param('id') id: number): Promise<{
        data: IUser[];
    }> {
        const users = await this.userCrudService.findAllWithRole(id);
        return this.inertiaAdapter.render('Iam/Roles/DetailRole', {
            data: users,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_ROLE))
    @Get('edit/:id')
    async editPage(@Param('id') id: number): Promise<{
        data: IRole;
        permissions: IPermission[];
    }> {
        const data = await this.roleCrudService.findById(id);
        const permissions = await this.permissionCrudService.findAll();

        return this.inertiaAdapter.render('Iam/Roles/EditRole', {
            data,
            permissions,
        });
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_CREATE_ROLE))
    @Post('create')
    async store(@Body() roleCreateRequest: RoleCreateRequest): Promise<void> {
        await this.roleCrudService.create(roleCreateRequest);
        return this.inertiaAdapter.successResponse('roles', 'Success create');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_UPDATE_ROLE))
    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() roleEditRequest: RoleEditRequest,
    ): Promise<void> {
        await this.roleCrudService.edit(id, roleEditRequest);
        return this.inertiaAdapter.successResponse('roles', 'Success edit');
    }

    @UseGuards(PermissionGuard(PERMISSION_BACKOFFICE_DELETE_ROLE))
    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.roleCrudService.delete(id);
        return this.inertiaAdapter.successResponse('roles', 'Success delete');
    }
}
