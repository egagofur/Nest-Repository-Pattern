import { Injectable } from '@nestjs/common';
import { IPermission } from 'interface-models/iam/permission.interface';
import { PermissionService } from '../services/permission.service';

@Injectable()
export class PermissionCrudApplication {
    constructor(private readonly permissionService: PermissionService) {}

    async findById(id: number): Promise<IPermission> {
        const results = await this.permissionService.findOneById(id);
        return results;
    }

    async getAll(): Promise<IPermission[]> {
        const results = await this.permissionService.findAll();
        return results;
    }
}
