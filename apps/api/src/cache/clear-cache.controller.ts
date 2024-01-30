import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CacheClear } from 'apps/api/src/infrastructure/cache/decorators/cache-clear.decorator';
import { config } from 'apps/api/src/config';

@Controller('clear-cache')
export class ClearCacheController {
    @Post()
    @CacheClear(config.cache.name.users.detail)
    clearCache(@Res() res: Response): any {
        const healthcheck = {
            message: 'Cache success deleted',
            data: [config.cache.name.users.detail],
        };
        res.send(healthcheck);
    }
}
