import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IConfig } from 'interface-models/config/config.interface';
import { Config } from 'entities/config/config.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class ConfigService {
    constructor(
        @InjectRepository(Config)
        private readonly configRepository: Repository<Config>,
    ) {}

    async create(data: IConfig): Promise<IConfig> {
        const newAdmin = this.configRepository.create(data);
        return await this.configRepository.save(newAdmin);
    }

    async update(id: number, data: IConfig): Promise<IConfig> {
        const status = await this.configRepository.update({ id }, { ...data });
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    async delete(id: number): Promise<void> {
        const status = await this.configRepository.delete({ id });
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }
    }

    async findOneById(id: number): Promise<IConfig> {
        return await this.configRepository.findOneOrFail({
            where: { id },
        });
    }
}
