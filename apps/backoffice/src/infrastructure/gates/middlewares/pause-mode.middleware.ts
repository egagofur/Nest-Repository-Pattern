import { Injectable, NestMiddleware } from '@nestjs/common';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { config } from 'apps/backoffice/src/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PauseModeMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        const isEnable = config.mode.pause.isEnable;
        const startAt = new Date(config.mode.pause.startAt);
        const endAt = new Date(config.mode.pause.endAt);

        const currentDateTime = new Date();
        const enableAndTimeValid =
            isEnable && startAt <= currentDateTime && endAt >= currentDateTime;

        if (
            (!isEnable && req.baseUrl.includes('/mode/pause')) ||
            (!enableAndTimeValid && req.baseUrl.includes('/mode/pause'))
        ) {
            return res.redirect('/');
        }
        if (
            !isEnable ||
            req.baseUrl.includes('/health') ||
            req.baseUrl.includes('/mode/pause')
        ) {
            return next();
        } else if (!enableAndTimeValid) {
            return next();
        }

        const message = config.mode.pause.message;

        const params = new URLSearchParams();
        params.append('message', message);
        params.append('start_at', Utils.formatDate(startAt));
        params.append('end_at', Utils.formatDate(endAt));

        res.redirect(`/mode/pause?${params}`);
    }
}
