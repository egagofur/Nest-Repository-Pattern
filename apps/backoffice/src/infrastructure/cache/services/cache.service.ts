import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IndexRequest } from 'apps/backoffice/src/common/request/index.request';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getNameCacheIndex(
        key: string,
        indexRequest: IndexRequest,
        ...anotherArgs: string[]
    ): Promise<string> {
        return (
            key +
            '-' +
            Object.keys(indexRequest)
                .map((key) => {
                    return indexRequest[key];
                })
                .join('-') +
            (anotherArgs.length > 0 ? '-' + anotherArgs.join('-') : '')
        );
    }

    async setNameByEndpoint(
        endpoint: string,
        params: string[],
    ): Promise<string> {
        return endpoint + '-' + params.join('-');
    }

    // generate key name cache from key and it's params
    async getNameCacheList(key: string, params: string[]): Promise<string> {
        return key + '-' + params.join('-');
    }

    // generate key name cache from key and it's params by id as number
    async getNameCacheDetailNumber(key: string, id: number): Promise<string> {
        return key + '-' + id;
    }

    // generate key name cache from key and it's params by id as string
    async getNameCacheDetailString(key: string, id: string): Promise<string> {
        return key + '-' + id;
    }

    // set or save cache by key
    async setCache<T>(key: string, data: T): Promise<void> {
        await this.cacheManager.set<T>(key, data);
    }

    // get cache by key
    async getCache<T>(key: string): Promise<T> {
        return (await this.cacheManager.get<T>(key)) || null;
    }

    // delete cache by key
    async deleteCache(key: string): Promise<any> {
        await this.cacheManager.del(key);
    }

    // reset cache
    async resetCache(): Promise<void> {
        await this.cacheManager.reset();
    }

    // clean cache by match key string
    async cleanCacheMatch(keyMatch: string): Promise<void> {
        const cacheNames = await this.cacheManager.store.keys<string[]>();
        const names = cacheNames.filter((name) => {
            return name.includes(keyMatch);
        });

        names.forEach((cacheName) => {
            this.deleteCache(cacheName);
        });
    }

    // clean cache by match key array of string
    async cleanCacheMatches(keyMatches: string[]): Promise<void> {
        keyMatches.forEach((keyMatch) => this.cleanCacheMatch(keyMatch));
    }
}
