import { Inject } from '@nestjs/common';
import { RedisService } from '../../redis/services/redis.service';
import { REQUEST } from '@nestjs/core';
import { FAIL_SAFE_PREFIX } from '../../contants';
import { Request } from 'express';
import { FailSafeService } from '../services/fail-safe.service';
import InternalOpenCircuitException from '../../error/internal-open-circuit-exception.exception';
import { config } from 'apps/backoffice/src/config';

// decorator for get cache if exist or set cache if no exist
export const FailSafeCheck = (): any => {
    const injectRedisService = Inject(RedisService);
    const injectFailSafeService = Inject(FailSafeService);
    const injectRequest = Inject(REQUEST);

    return (
        target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor,
    ) => {
        injectRedisService(target, 'redisService');
        injectFailSafeService(target, 'failSafeService');
        injectRequest(target, 'request');

        const originalMethod = propertyDescriptor.value;

        propertyDescriptor.value = async function (...args: any[]) {
            if (!config.circuitBreaker.isEnable) {
                return originalMethod.apply(this, arguments);
            }

            const request: Request = this.request;
            const redisService: RedisService = this.redisService;
            const failSafeService: FailSafeService = this.failSafeService;

            // get key from path of url
            const key = request.originalUrl;
            const failSafeKey = failSafeService.createKey(key);

            // check the expiry of fail safe open gate
            const isExpiry = await redisService.checkExpiry(failSafeKey);
            if (isExpiry) {
                return originalMethod.apply(this, arguments);
            }

            // get value count of fail safe fired
            const failSafeErrorCount = await redisService.getValue(failSafeKey);
            const downCount = parseInt(failSafeErrorCount) || 0;

            const maxDown = config.circuitBreaker.maxDown;
            if (downCount > maxDown) throw new InternalOpenCircuitException();
            return originalMethod.apply(this, arguments);
        };
    };
};
