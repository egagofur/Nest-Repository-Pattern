import { Inject } from '@nestjs/common';
import { CacheService } from '../services/cache.service';

// decorator for get cache if exist or set cache if no exist
export const CacheGetSet = (key: string): any => {
    const injectCacheService = Inject(CacheService);

    return (
        target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor,
    ) => {
        injectCacheService(target, 'cacheService');

        const originalMethod = propertyDescriptor.value;

        //redefine descriptor value within own function block
        propertyDescriptor.value = async function (...args: any[]) {
            const nameKey = [
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
