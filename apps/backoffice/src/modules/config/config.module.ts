import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from 'entities/config/config.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';

import { ConfigCrudApplication } from './applications/config-crud.application';
import { ConfigIndexApplication } from './applications/config-index.application';
import { ConfigController } from './controllers/config.controller';
import { ConfigService } from './services/config.service';

import { CacheModule } from '../../infrastructure/cache/cache.module';

@Module({
    imports: [TypeOrmModule.forFeature([Config]), CacheModule],
    controllers: [ConfigController],
    providers: [
        InertiaAdapter,
        ConfigIndexApplication,
        ConfigCrudApplication,
        ConfigService,
    ],
})
export class ConfigModule {}
