import { Module } from '@nestjs/common';
import redis from 'redis';
import { REDIS } from '../contants';
import { config } from 'apps/backoffice/src/config';
import { RedisService } from './services/redis.service';

@Module({
    providers: [
        {
            provide: REDIS,
            useValue: redis.createClient(
                config.redis.isEnabled == 'true'
                    ? {
                          port: +config.redis.port,
                          host: config.redis.host,
                      }
                    : {},
            ),
        },
        RedisService,
    ],
    exports: [REDIS, RedisService],
})
export class RedisModule {}
