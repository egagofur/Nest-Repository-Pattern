import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-http-promise';
import { EmailNotificationService } from './services/email-notification.service';
import { GoSmsApiNotificationService } from './services/gosmsapi-notification.service';
import { OneSignalPushNotificationService } from './services/one-signal-push-notification.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 60000,
            retries: 5,
        }),
    ],
    controllers: [],
    providers: [
        OneSignalPushNotificationService,
        EmailNotificationService,
        GoSmsApiNotificationService,
    ],
    exports: [],
})
export class NotificationModule {}
