import { Injectable } from '@nestjs/common';
import { IConfig } from 'interface-models/config/config.interface';
import { ConfigCreateRequest } from '../requests/config-create.request';
import { ConfigService } from '../services/config.service';
import { ConfigEditRequest } from '../requests/config-edit.request';
import { CacheService } from 'apps/backoffice/src/infrastructure/cache/services/cache.service';

@Injectable()
export class ConfigCrudApplication {
    constructor(
        private readonly configService: ConfigService,
        private readonly cacheService: CacheService,
    ) {}

    async create(configRequest: ConfigCreateRequest): Promise<IConfig> {
        const newConfig = <IConfig>{};

        newConfig.name = configRequest.name;
        newConfig.value = configRequest.value;

        return await this.configService.create(newConfig);
    }

    async edit(id: number, configRequest: ConfigEditRequest): Promise<IConfig> {
        await this.configService.findOneById(id);
        const editConfig = <IConfig>{};

        editConfig.name = configRequest.name;
        editConfig.value = configRequest.value;

        return await this.configService.update(id, editConfig);
    }

    async delete(id: number): Promise<void> {
        await this.configService.findOneById(id);
        await this.configService.delete(id);
    }

    async findById(id: number): Promise<IConfig> {
        const data = await this.configService.findOneById(id);
        return data;
    }
}
