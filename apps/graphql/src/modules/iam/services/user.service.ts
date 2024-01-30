import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { User } from 'entities/iam/user.entity';
import { Repository } from 'typeorm';
import { CacheClear } from 'apps/graphql/src/infrastructure/cache/decorators/cache-clear.decorator';
import { config } from 'apps/graphql/src/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findOneById(id: number): Promise<IUser> {
        return await this.userRepository.findOneOrFail({
            where: { id },
            relations: ['role', 'role.permissions'],
        });
    }

    async findAll(take: number): Promise<IUser[]> {
        return await this.userRepository.find({
            take,
            relations: ['role', 'role.permissions'],
        });
    }

    @CacheClear(config.cache.name.users.detail)
    async update(id: number, data: IUser): Promise<void> {
        await this.userRepository.update(
            { id },
            {
                ...data,
            },
        );
    }
}
