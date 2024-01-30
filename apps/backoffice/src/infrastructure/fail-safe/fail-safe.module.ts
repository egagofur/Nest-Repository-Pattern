import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { config } from '../../config';
import { RedisModule } from '../redis';
import { FailSafeService } from './services/fail-safe.service';
import { RedisService } from '../redis/services/redis.service';

@Module({
    imports: [RedisModule],
    providers: [FailSafeService],
    exports: [FailSafeService],
})
export class FailSafeModule {}
