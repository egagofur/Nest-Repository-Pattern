import { LogActivityMenuEnum } from 'apps/backoffice/src/common/enums/log-activity.enum';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { EmailNotificationService } from 'apps/backoffice/src/infrastructure/notification/services/email-notification.service';
import { OneSignalPushNotificationService } from '../../../infrastructure/notification/services/one-signal-push-notification.service';
import { AdminAuthService } from '../services/auth-admin.service';
import { Request } from 'express';
import { LogActivityService } from '../../log-activity/services/log-activity.service';
import { IUser } from 'interface-models/iam/user.interface';

@Injectable()
export class AuthApplication {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly adminAuthService: AdminAuthService,
        private readonly oneSignalPushNotificationService: OneSignalPushNotificationService,
        private readonly emailNotificationService: EmailNotificationService,
        private readonly logActivityService: LogActivityService,
    ) {}

    async addOneSignalPlayerIdById(
        id: number,
        playerId: string,
    ): Promise<void> {
        await this.adminAuthService.addOneSignalPlayerIdById(id, playerId);
        await this.oneSignalPushNotificationService.setStatus(playerId, true);
        this.request.session['playerId'] = playerId || null;
    }

    async sendNotifEmailLoginAttempt(): Promise<void> {
        const email = this.request.user['email'];
        this.emailNotificationService.sendEmail(
            'Login Attempt',
            {},
            'login-attempt',
            email,
        );
    }

    async loginAttempt(id: number, playerId: string): Promise<void> {
        const isUUID =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                playerId,
            );
        if (isUUID) {
            await this.addOneSignalPlayerIdById(id, playerId);
        }

        await this.sendNotifEmailLoginAttempt();

        this.logActivityService.create({
            activity:
                'user with email ' + this.request.user['email'] + ' login',
            metaData: {
                email: this.request.user['email'],
            },
            user: this.request.user as IUser,
            source: id.toString(),
            menu: LogActivityMenuEnum.AUTH,
            path: __filename,
        });
    }

    async logout(playerId: string): Promise<void> {
        this.logActivityService.create({
            activity:
                'user with email ' + this.request.user['email'] + ' logout',
            metaData: {
                username: this.request.user['email'],
                password: this.request.user['password'],
            },
            user: this.request.user as IUser,
            source: this.request.user['id'].toString(),
            menu: LogActivityMenuEnum.AUTH,
            path: __filename,
        });

        const id = this.request.user['id'];
        this.request.session['playerId'] = null;
        await this.adminAuthService.removeOneSignalPlayerIdById(id, playerId);
        await this.oneSignalPushNotificationService.setStatus(playerId, false);
        this.request.logOut((done) => {
            Logger.log(done);
        });
    }
}
