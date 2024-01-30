import { Inject } from '@nestjs/common';
import { CacheService } from '../services/cache.service';

export const CacheClear = (...cacheNames: string[]): any => {
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
            const cacheService: CacheService = this.cacheService;
            cacheService.cleanCacheMatches(cacheNames);
            return await originalMethod.apply(this, args);
        };
    };
};
