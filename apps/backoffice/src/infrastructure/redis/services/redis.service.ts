import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { REDIS } from '../../contants';
import { RedisClient } from 'redis';

@Injectable()
export class RedisService {
    constructor(
        @Inject(REDIS) private readonly redisClient: RedisClient
    ) { }

    async storeValue(key: string, value: string): Promise<boolean> {
        console.log("========= store value redis =========")
        await this.redisClient.set(key, value)
        return true;
    }

    async getValue(key: string): Promise<string> {
        const promies = new Promise((resolve, reject) => {
            this.redisClient.get(key, (err, reply) => {
                if (err) resolve(null)
                resolve(reply)
            });
        })

        const promiseValue = (await promies)
        return promiseValue ? promiseValue.toString() : null
    }

    async checkExpiry(key: string): Promise<boolean> {
        const promies = new Promise((resolve, reject) => {
            this.redisClient.ttl(key, (err, reply) => {
                if (err) resolve(null)
                resolve(reply)
            });
        })

        const promiseValue = Number(await promies)
        const isExpiry = promiseValue < 0;

        if (isExpiry) {
            await this.removeValue(key)
        }

        return isExpiry;
    }

    async removeValue(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async removeAll(): Promise<void> {
        await this.redisClient.flushall(function (err, succeeded) {
            console.log(succeeded); // will be true if successfull
        });
    }

    async setExpiry(key: string, expiry: number): Promise<void> {
        await this.redisClient.expireat(key, expiry)
    }

    async storeObject(key: string, obj: object): Promise<boolean> {
        await this.redisClient.HSET(key, 'data', obj);
        return true;
    }

}
