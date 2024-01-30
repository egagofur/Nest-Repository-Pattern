import { Injectable } from '@nestjs/common';
import { IRole } from 'interface-models/iam/role.interface';
import { RoleService } from '../services/role.service';

@Injectable()
export class RoleCrudApplication {
    constructor(private readonly roleService: RoleService) {}

    async findById(id: number): Promise<IRole> {
        const results = await this.roleService.findOneById(id);
        return results;
    }

    async getAll(): Promise<IRole[]> {
        const results = await this.roleService.findAll();
        return results;
    }
}
