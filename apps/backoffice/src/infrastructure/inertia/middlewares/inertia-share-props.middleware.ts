import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InertiaAdapter } from '../adapter/inertia.adapter';

@Injectable()
export class InertiaSharePropsMiddleware implements NestMiddleware {
    constructor(private readonly inertiaAdapter: InertiaAdapter) {}

    use(req: Request, res: Response, next: NextFunction): any {
        if (req.session != undefined) {
            // get error session and set to shared props
            this.inertiaAdapter.share({ error: req.session['error'] || null });
            req.session['error'] = null;

            this.inertiaAdapter.share({
                success: req.session['success'] || null,
            });
            req.session['success'] = null;
        }

        next();
    }
}
