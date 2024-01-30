import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { Otp } from 'entities/otp/otp.entity';
import { HttpModule } from 'nestjs-http-promise';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { EmailNotificationService } from '../../infrastructure/notification/services/email-notification.service';
import { GoSmsApiNotificationService } from '../../infrastructure/notification/services/gosmsapi-notification.service';
import { OtpService } from '../auth/services/otp.service';
import { UserApplication } from './applications/user.application';
import { UserController } from './controllers/v1/user.controller';
import { UserService } from './services/user.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 60000,
            retries: 5,
        }),
        TypeOrmModule.forFeature([User, Otp]),
        CacheModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        EmailNotificationService,
        OtpService,
        UserApplication,
        GoSmsApiNotificationService,
    ],
    exports: [UserService],
})
export class UserModule {}
