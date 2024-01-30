import { Module } from '@nestjs/common';
import { EmailNotificationService } from './services/email-notification.service';
import { OneSignalPushNotificationService } from './services/one-signal-push-notification.service';

@Module({
    imports: [],
    controllers: [],
    providers: [OneSignalPushNotificationService, EmailNotificationService],
    exports: [],
})
export class NotificationModule {}
