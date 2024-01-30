import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-http-promise';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import { Otp } from 'entities/otp/otp.entity';
import { config } from '../../config';
import { AuthCrudApplication } from './applications/auth-crud.application';
import { AuthOtpApplication } from './applications/auth-otp.application';

import { AuthRegisterApplication } from './applications/auth-register.application';
import { AuthLoginController } from './controllers/v1/auth-login.controller';
import { AuthOtpController } from './controllers/v1/auth-otp.controller';
import { AuthController } from './controllers/v1/auth-register.controller';
import { UserSerializer } from './serializers/user.serializer';
import { AuthService } from './services/auth.service';
import { OtpService } from './services/otp.service';
import { RoleService } from './services/role.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthLoginApplication } from './applications/auth-login.application';
import { AuthForgotPasswordApplication } from './applications/auth-forgot-password.application';
import { AuthForgotPasswordController } from './controllers/v1/auth-forgot-password.controller';
import { OneSignalPushNotificationService } from '../../infrastructure/notification/services/one-signal-push-notification.service';
import { EmailNotificationService } from '../../infrastructure/notification/services/email-notification.service';
import { AuthLogoutApplication } from './applications/auth-logout.application';
import { AuthLogoutController } from './controllers/v1/auth-logout.controller';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { GoSmsApiNotificationService } from '../../infrastructure/notification/services/gosmsapi-notification.service';
import { LogActivityService } from 'apps/backoffice/src/modules/log-activity/services/log-activity.service';
import { LogActivity } from 'entities/log-activity/log-activity.entity';

@Module({
    imports: [
        HttpModule.register({
            timeout: 60000,
            retries: 5,
        }),
        TypeOrmModule.forFeature([User, Role, Otp, LogActivity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [],
            useFactory: async () => ({
                secret: config.auth.jwt.secret,
                signOptions: {
                    expiresIn: `${config.auth.jwt.timeExpired.year} years`,
                },
            }),
            inject: [],
        }),
        CacheModule,
    ],
    controllers: [
        AuthController,
        AuthOtpController,
        AuthForgotPasswordController,
        AuthLoginController,
        AuthLogoutController,
    ],
    providers: [
        AuthRegisterApplication,
        AuthService,
        JwtStrategy,
        OneSignalPushNotificationService,
        UserSerializer,
        EmailNotificationService,
        AuthCrudApplication,
        AuthOtpApplication,
        OtpService,
        AuthForgotPasswordApplication,
        RoleService,
        AuthLoginApplication,
        AuthLogoutApplication,
        GoSmsApiNotificationService,
        LogActivityService,
    ],
})
export class AuthModule {}
