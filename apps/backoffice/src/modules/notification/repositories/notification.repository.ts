import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'interface-models/iam/user.interface';
import { In, Repository, UpdateResult } from 'typeorm';
import { PaginateUtil } from 'apps/backoffice/src/common/utils/paginate.util';
import { IPaginateResponse } from 'apps/backoffice/src/common/interface/index.interface';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { InAppNotificationIndexRequest } from '../requests/in-app-notification-index.request';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';

@Injectable()
export class NotificationRepository extends Repository<InAppNotification> {
    constructor(
        @InjectRepository(InAppNotification)
        private readonly repo: Repository<InAppNotification>,
        private readonly paginationUtil: PaginateUtil,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async pagination(
        request: InAppNotificationIndexRequest,
        user: IUser,
    ): Promise<IPaginateResponse<InAppNotification>> {
        const ALLOW_TO_SORT = ['latest', 'oldest', 'title'];

        const query = this.createQueryBuilder('notification')
            .leftJoinAndSelect('notification.targetUser', 'targetUser')
            .andWhere('targetUser.id = :userId', { userId: user.id });

        if (request.search) {
            query.andWhere(
                `concat(notification.title, ' ', notification.message, ' ', notification.id) like :search`,
                {
                    search: `%${request.search}%`,
                },
            );
        }

        if (request.isRead) {
            query.andWhere('notification.isRead = :isRead', {
                isRead: request.isRead == 'Read' ? true : false,
            });
        }

        if (request.sort == 'latest') {
            query.orderBy('notification.createdAt', 'DESC');
        } else if (request.sort == 'oldest') {
            query.orderBy('notification.createdAt', 'ASC');
        } else {
            query.orderBy(
                ALLOW_TO_SORT.includes(request.sort)
                    ? `notification.${request.sort}`
                    : `notification.createdAt`,
                this.paginationUtil.getOrder(request.order),
            );
        }

        query.take(request.perPage ?? 10);
        query.skip(this.paginationUtil.countOffset(request));

        const [data, count] = await query.getManyAndCount();

        const meta = this.paginationUtil.mapMeta(count, request);

        const results = {
            data,
            meta,
        };

        return results;
    }

    async createNotification(notification: IInAppNotification): Promise<void> {
        const newNotification = this.repo.create(notification);
        await this.repo.save(newNotification);
    }

    async bulkCreateNotification(
        notifications: IInAppNotification[],
    ): Promise<void> {
        const newNotifications = this.repo.create(notifications);
        await this.repo.save(newNotifications);
    }

    async readAllNotification(): Promise<UpdateResult> {
        return await this.repo.update(
            {},
            {
                isRead: true,
            },
        );
    }

    async readNotificationsByIds(ids: number[]): Promise<UpdateResult> {
        return await this.repo.update(
            {
                id: In(ids),
            },
            {
                isRead: true,
            },
        );
    }

    async readNotificationById(id: number): Promise<UpdateResult> {
        return await this.repo.update(
            {
                id,
            },
            {
                isRead: true,
            },
        );
    }

    async countUnreadNotificationByUserId(userId: number): Promise<number> {
        return await this.createQueryBuilder('notification')
            .where('notification.targetUser = :userId', { userId })
            .andWhere('notification.isRead = :isRead', { isRead: false })
            .getCount();
    }
}
