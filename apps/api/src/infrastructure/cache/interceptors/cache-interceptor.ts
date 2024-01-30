import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Utils } from 'apps/api/src/common/utils/util';
import { config } from 'apps/api/src/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(private readonly cacheService: CacheService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest() as Request;
        const url = request.url;

        const isInertia = request.headers['x-inertia'] == 'true' || false;
        if (isInertia) {
            return next.handle();
        }

        const isUserCache = request.headers['is-user-cache'] == 'true' || false;
        const userId = isUserCache ? request.user['id'] : null;

        if (url.includes('?')) {
            const endpoint = url.split('?')[0];
            const params = Object.keys(request.query).map(
                (x) => x + '=' + request.query[x].toString(),
            );

            const nameKey = await this.cacheService.setNameByEndpoint(
                (userId ?? '') + '-' + endpoint,
                params,
            );

            return next.handle().pipe(
                map(async (data) => {
                    if (data) {
                        const dataCache = data;
                        if (data?.data) {
                            dataCache.data = Utils.snakeCaseKey(data.data);
                            dataCache.data = Utils.parseDatetime(
                                data.data,
                                request.headers['timezone'] != undefined
                                    ? request.headers['timezone']?.toString()
                                    : config.timezone,
                            );
                        }

                        if (data?.meta) {
                            dataCache.meta = Utils.snakeCaseKey(data.meta);
                            dataCache.meta = Utils.parseDatetime(
                                data.meta,
                                request.headers['timezone'] != undefined
                                    ? request.headers['timezone']?.toString()
                                    : config.timezone,
                            );
                        }

                        await this.cacheService.setCache(nameKey, dataCache);
                    }

                    return data;
                }),
            );
        } else {
            const nameKey = (userId ?? '') + '-' + url;
            return next.handle().pipe(
                map(async (data) => {
                    if (data) {
                        const dataCache = data;
                        dataCache.data = Utils.snakeCaseKey(data.data);
                        await this.cacheService.setCache(nameKey, data);

                        return data;
                    }
                }),
            );
        }
    }
}
