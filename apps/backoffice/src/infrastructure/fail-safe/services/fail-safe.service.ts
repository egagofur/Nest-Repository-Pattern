import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/services/redis.service';
import { FAIL_SAFE_PREFIX } from '../../contants';
import InternalOpenCircuitException from '../../error/internal-open-circuit-exception.exception';
import { config } from 'apps/backoffice/src/config';

@Injectable()
export class FailSafeService {
    constructor(private readonly redisService: RedisService) {}

    async catchError(key: string): Promise<void> {
        if (!config.circuitBreaker.isEnable) return;

        const redisKey = this.createKey(key);
        const value = await this.redisService.getValue(redisKey);
        const currentCount = parseInt(value) || 0;
        const nextCount = currentCount + 1;

        // cooldown 5min after error
        const cooldownAfterError =
            Math.round(+new Date() / 1000) +
            config.circuitBreaker.cooldownOnOpen;
        await this.redisService.storeValue(redisKey, nextCount.toString());
        await this.redisService.setExpiry(redisKey, cooldownAfterError);
    }

    createKey(key: string): string {
        const recepieKey = FAIL_SAFE_PREFIX + key.replace(/\//g, '-');
        return recepieKey;
    }
}
