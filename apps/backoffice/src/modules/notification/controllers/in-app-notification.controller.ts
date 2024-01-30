import {
    Controller,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import { InertiaAdapter } from 'apps/backoffice/src/infrastructure/inertia/adapter/inertia.adapter';
import { IUser } from 'interface-models/iam/user.interface';
import { LoggedInGuard } from '../../auth/guards/logged-in.guard';
import { GetUserLogged } from '../../iam/decorators/get-user.decorator';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';
import { InAppNotificationMarkReadRequest } from '../requests/in-app-notification-mark-read.request';
import { InAppNotificationService } from '../services/in-app-notification.service';
import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';

@Controller('notifications')
@UseGuards(LoggedInGuard)
export class InAppNotificationController {
    constructor(
        private readonly inertiaAdapter: InertiaAdapter,
        private readonly inAppNotificationService: InAppNotificationService,
    ) {}

    @Get()
    async fetch(
        @Query() indexRequest: InAppNotificationIndexRequest,
        @GetUserLogged() user: IUser,
    ): Promise<{
        title: string;
        data: IInAppNotification[];
        meta: IPaginationMeta;
    }> {
        const response = await this.inAppNotificationService.pagination(
            indexRequest,
            user,
        );

        return this.inertiaAdapter.render('Notifications', {
            title: 'Notifications',
            data: response.data,
            meta: response.meta,
        });
    }

    @Get(':id')
    async findOneAndMarkRead(@Param('id') id: number): Promise<{
        title: string;
        data: IInAppNotification;
    }> {
        const dataMarkRead = new InAppNotificationMarkReadRequest();
        dataMarkRead.notificationIds = [id];
        await this.inAppNotificationService.readNotificationsByIds(
            dataMarkRead,
        );

        const data = await this.inAppNotificationService.findOneById(id);
        return this.inertiaAdapter.render('Notifications/DetailNotification', {
            title: 'Detail Notification',
            data,
        });
    }

    @Patch('mark-read-all')
    async markReadAll(): Promise<void> {
        await this.inAppNotificationService.readAllNotification();
        this.inertiaAdapter.share('success');
        return this.inertiaAdapter.successResponse(
            '/notifications',
            'Sukses mark all',
        );
    }
}
