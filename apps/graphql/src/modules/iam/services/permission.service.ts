import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPermission } from 'interface-models/iam/permission.interface';
import { Permission } from 'entities/iam/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly PermissionRepository: Repository<Permission>,
    ) {}

    async findOneById(id: number): Promise<IPermission> {
        return await this.PermissionRepository.findOneOrFail({
            where: { id },
        });
    }

    async findAll(): Promise<IPermission[]> {
        return await this.PermissionRepository.find();
    }
}
