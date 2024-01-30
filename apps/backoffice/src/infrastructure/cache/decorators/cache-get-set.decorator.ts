import { config } from 'apps/backoffice/src/config';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CacheService } from '../services/cache.service';

// decorator for get cache if exist or set cache if no exist
export const CacheGetSet = (key: string): any => {
    const injectCacheService = Inject(CacheService);
    const injectRequest = Inject(REQUEST);

    return (
        target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor,
    ) => {
        injectCacheService(target, 'cacheService');
        injectRequest(target, 'request');

        const originalMethod = propertyDescriptor.value;

        //redefine descriptor value within own function block
        propertyDescriptor.value = async function (...args: any[]) {
            const request: Request = this.request;
            const userId = request['user']?.id;
            const cacheScope = userId
                ? config.cache.scope.user + '-' + userId
                : config.cache.scope.global;

            const nameKey = [
                cacheScope,
                key,
                propertyKey,
                JSON.stringify(args).replace(/[^\w\s]/gi, ''),
            ].join('-');
            const dataCache = await this.cacheService.getCache(nameKey);

            if (dataCache) {
                return dataCache;
            }

            const data = await originalMethod.apply(this, args);
            await this.cacheService.setCache(nameKey, data);
            return data;
        };
    };
};
