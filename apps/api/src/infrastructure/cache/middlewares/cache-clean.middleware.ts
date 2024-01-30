import { Injectable, NestMiddleware } from '@nestjs/common';
import { config } from 'apps/backoffice/src/config';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheCleanMiddleware implements NestMiddleware {
    constructor(private readonly cacheService: CacheService) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        if (req.query['cache']) {
            if (req.query['cache'] == 'clean-all') {
                const names = Object.keys(config.cache.name);
                for (let i = 0; i < names.length; i++) {
                    const entityName = names[i];
                    const fields = Object.keys(config.cache.name[entityName]);
                    for (let j = 0; j < fields.length; j++) {
                        const fieldName = fields[j];
                        const cacheNameMatch =
                            config.cache.name[entityName][fieldName];

                        await this.cacheService.cleanCacheMatch(cacheNameMatch);
                    }
                }
            } else {
                const nameCache = <string>req.query['cache'];
                nameCache.replace('clean-', '');
                await this.cacheService.cleanCacheMatch(nameCache);
            }
        }

        next();
    }
}
