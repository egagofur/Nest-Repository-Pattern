import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { OneSignalPushNotificationService } from 'apps/api/src/infrastructure/notification/services/one-signal-push-notification.service';

@Injectable()
export class AuthLogoutApplication {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly authService: AuthService,
        private readonly oneSignalPushNotificationService: OneSignalPushNotificationService,
    ) {}

    async logout(playerId: string): Promise<any> {
        const id = this.request.user['id'];
        await this.authService.removeOneSignalPlayerIdById(id, playerId);
        await this.oneSignalPushNotificationService.setStatus(playerId, false);
        return this.request.user;
    }
}
