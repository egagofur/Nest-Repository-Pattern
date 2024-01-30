import { Injectable, NestMiddleware } from '@nestjs/common';
import { config } from 'apps/backoffice/src/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MaintainModeMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        const isEnable = config.mode.maintain.isEnable;

        if (!isEnable && req.baseUrl.includes('/mode/maintain')) {
            return res.redirect('/');
        } else if (
            !isEnable ||
            req.baseUrl.includes('/health') ||
            req.baseUrl.includes('/mode/maintain')
        ) {
            return next();
        }

        return res.redirect('/mode/maintain');
    }
}
