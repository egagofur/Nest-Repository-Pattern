import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CacheService } from '../services/cache.service';
import { Request } from 'express';

export const CacheDetail = (): any => {
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
            const cacheService: CacheService = this.cacheService;
            const request: Request = this.request;
            const nameKey = request.url;

            const isInertia =
                this.request.headers['x-inertia'] == 'true' || false;
            if (!isInertia) {
                const dataCacheJSON = await cacheService.getCache(nameKey);
                if (dataCacheJSON != null) {
                    return dataCacheJSON;
                }
            }

            return await originalMethod.apply(this, args);
        };
    };
};
