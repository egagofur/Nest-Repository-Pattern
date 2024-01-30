import { Injectable, NestMiddleware } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { Request, Response } from 'express';
import { UserCrudService } from '../services/user-crud.service';

@Injectable()
export class UserDetailMiddleware implements NestMiddleware {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly userCrudService: UserCrudService,
    ) {}

    async use(req: Request, res: Response, next: () => void): Promise<void> {
        this.inertiaAdapter.share({
            playerId: req.session['playerId'] || null,
        });

        if (req.user) {
            const user = await this.userCrudService.findById(req.user['id']);
            this.inertiaAdapter.share({
                userDetail: user,
            });
        } else {
            this.inertiaAdapter.share({
                userDetail: null,
            });
        }

        next();
    }
}
