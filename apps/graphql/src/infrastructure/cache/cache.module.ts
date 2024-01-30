import { CacheModule as CacheModuleManager, Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import * as redisStore from 'cache-manager-redis-store';
import { config } from '../../config';

@Module({
    imports: [
        CacheModuleManager.register({
            store: redisStore,
            host: config.redis.host,
            port: config.redis.port,
            ttl: 60,
        }),
    ],
    providers: [CacheService],
    exports: [CacheService],
})
export class CacheModule {}
