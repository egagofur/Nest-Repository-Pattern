import { Injectable, NestMiddleware } from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { Request, Response } from 'express';
import { IUser } from 'interface-models/iam/user.interface';
import { InAppNotificationService } from '../services/in-app-notification.service';

@Injectable()
export class NotificationUnreadMiddleware implements NestMiddleware {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly inAppNotificationService: InAppNotificationService,
    ) {}

    async use(req: Request, res: Response, next: () => void): Promise<void> {
        if (!req.user) return next();

        const user = req.user as IUser;
        const notificationUnread =
            await this.inAppNotificationService.countUnread(user.id);

        this.inertiaAdapter.share({
            notifications:
                {
                    notificationUnread,
                } || 0,
        });

        next();
    }
}
