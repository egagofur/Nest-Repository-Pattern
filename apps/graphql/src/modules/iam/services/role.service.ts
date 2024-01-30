import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRole } from 'interface-models/iam/role.interface';
import { Role } from 'entities/iam/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly RoleRepository: Repository<Role>,
    ) {}

    async findOneById(id: number): Promise<IRole> {
        return await this.RoleRepository.findOneOrFail({
            where: { id },
            relations: ['permissions'],
        });
    }

    async findAll(): Promise<IRole[]> {
        return await this.RoleRepository.find();
    }
}
