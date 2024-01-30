import { config } from 'apps/backoffice/src/config';
import { Injectable } from '@nestjs/common';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';
import { In, QueryFailedError } from 'typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { CacheClear } from 'apps/backoffice/src/infrastructure/cache/decorators/cache-clear.decorator';
import { NotificationRepository } from '../repositories/notification.repository';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';
import { InAppNotificationMarkReadRequest } from '../requests/in-app-notification-mark-read.request';

@Injectable()
export class InAppNotificationService {
    constructor(
        private readonly notificationRepository: NotificationRepository,
    ) {}

    async pagination(
        request: InAppNotificationIndexRequest,
        user: IUser,
    ): Promise<IPaginateResponse<IInAppNotification>> {
        return await this.notificationRepository.pagination(request, user);
    }

    async readAllNotification(): Promise<void> {
        await this.notificationRepository.readAllNotification();
    }

    async readNotificationsByIds(
        request: InAppNotificationMarkReadRequest,
    ): Promise<void> {
        await this.notificationRepository.readNotificationsByIds(
            request.notificationIds,
        );
    }

    @CacheClear(config.cache.name.notification.list)
    async create(data: IInAppNotification): Promise<void> {
        await this.notificationRepository.createNotification(data);
    }

    @CacheClear(config.cache.name.notification.list)
    async bulkCreateByUserIds(
        userIds: number[],
        data: IInAppNotification,
    ): Promise<void> {
        const newNotifications = userIds.map((userId) => {
            const newNotification = <IInAppNotification>{};
            Object.assign(newNotification, data);
            newNotification.targetUserId = userId;
            return newNotification;
        });

        await this.notificationRepository.bulkCreateNotification(
            newNotifications,
        );
    }

    @CacheClear(config.cache.name.notification.list)
    async update(
        id: number,
        data: IInAppNotification,
    ): Promise<IInAppNotification> {
        const status = await this.notificationRepository.update(
            { id },
            { ...data },
        );

        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    @CacheClear(config.cache.name.notification.list)
    async updateByUser(
        userId: number,
        data: IInAppNotification,
    ): Promise<IInAppNotification> {
        const status = await this.notificationRepository.update(
            { targetUser: { id: userId } },
            { ...data },
        );
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    @CacheClear(config.cache.name.notification.list)
    async updateByUserAndIds(
        userId: number,
        ids: number[],
        data: IInAppNotification,
    ): Promise<IInAppNotification> {
        const status = await this.notificationRepository.update(
            { id: In(ids), targetUser: { id: userId } },
            { ...data },
        );
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }

        return data;
    }

    @CacheClear(config.cache.name.notification.list)
    async delete(id: number): Promise<void> {
        const status = await this.notificationRepository.delete({ id });
        if (status.affected < 1) {
            throw new QueryFailedError('Error, Data not changed', null, null);
        }
    }

    async findOneById(id: number): Promise<IInAppNotification> {
        return await this.notificationRepository.findOneOrFail({
            where: { id },
        });
    }

    async findOneByUserAndId(
        userId: number,
        id: number,
    ): Promise<IInAppNotification> {
        return await this.notificationRepository.findOneOrFail({
            where: { id, targetUser: { id: userId } },
        });
    }

    async findOneByIds(ids: number[]): Promise<IInAppNotification[]> {
        return await this.notificationRepository.findBy({
            id: In(ids),
        });
    }

    async countUnread(userId: number): Promise<number> {
        return await this.notificationRepository.countUnreadNotificationByUserId(
            userId,
        );
    }

    @CacheClear(config.cache.name.notification.list)
    async markRead(id: number): Promise<void> {
        await this.notificationRepository.readNotificationById(id);
    }
}
