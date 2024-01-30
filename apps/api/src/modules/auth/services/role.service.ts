import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'entities/iam/role.entity';
import { IRole } from 'interface-models/iam/role.interface';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async findByKey(key: string): Promise<IRole> {
        return await this.roleRepository.findOneOrFail({
            where: {
                key,
            },
        });
    }
}
