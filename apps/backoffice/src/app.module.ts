import {
    HttpException,
    Inject,
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { InertiaSharePropsMiddleware } from './infrastructure/inertia/middlewares/inertia-share-props.middleware';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import {
    HttpExceptionFilter,
    EntityNotFoundExceptionFilter,
} from './common/filters/http-exeception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { dataSourceOptions } from '../../../databases/data-source';
import { ScheduleModule } from '@nestjs/schedule';
import { IamModule } from './modules/iam/iam.module';
import { ConfigModule } from './modules/config/config.module';
import { MainModule } from './modules/main/main.module';
import { AdminAuthModule } from './modules/auth/auth.module';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { REDIS, RedisModule } from '../src/infrastructure/redis';
import { RedisClient } from 'redis';
import passport from 'passport';
import { QueryExceptionFilter } from './common/filters/query-error-exception.filter';
import { CommonModule } from './modules/common/common.module';
import { NotificationModule } from './infrastructure/notification/notification.module';
import { InertiaModule } from './infrastructure/inertia/inertia.module';
import { UserDetailMiddleware } from './modules/iam/middlewares/user-detail.middleware';
import {
    EntityNotFoundError,
    FindRelationsNotFoundError,
    QueryFailedError,
} from 'typeorm';
import { CacheModule as CacheModuleManager } from '@nestjs/common';
import { CacheModule } from './infrastructure/cache/cache.module';
import { InAppNotificationModule as InAppNotificationModule } from './modules/notification/notification.module';
import { CacheCleanMiddleware } from './infrastructure/cache/middlewares/cache-clean.middleware';
import { LogActivityModule } from './modules/log-activity/log-activity.module';
import { GlobalServiceModule } from './modules/glob/global-service.module';
import { NotificationUnreadMiddleware } from './modules/notification/middlewares/notification-unread.middleware';
import { SentryModule } from './infrastructure/sentry/sentry.module';
import * as Sentry from '@sentry/node';
import { ProfileModule } from './modules/profile/profile.module';
import { InformationModule } from './modules/tests/information.module';
import { MailModule } from './infrastructure/mail/mail.module';
import { WinstonModule } from './infrastructure/winston/winston.module';
import { MaintainModeMiddleware } from './infrastructure/gates/middlewares/maintain-mode.middleware';
import { PauseModeMiddleware } from './infrastructure/gates/middlewares/pause-mode.middleware';
import { FailSafeModule } from './infrastructure/fail-safe/fail-safe.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
    imports: [
        SentryModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        CacheModuleManager.register({ isGlobal: true }),
        MailModule,
        WinstonModule,
        RavenModule,
        RedisModule,
        FailSafeModule,

        // write your module here
        ConfigModule,
        InAppNotificationModule,
        CacheModule,
        InformationModule,
        AdminAuthModule,
        MainModule,
        CommonModule,
        IamModule,
        NotificationModule,
        InAppNotificationModule,
        ScheduleModule.forRoot(),
        InertiaModule,
        LogActivityModule,
        GlobalServiceModule,
        ProfileModule,
        MovieModule,
    ],
    providers: [
        {
            // Global Error Handler
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            // Global Error Handler
            provide: APP_FILTER,
            useClass: EntityNotFoundExceptionFilter,
        },
        {
            // Global Error Handler
            provide: APP_FILTER,
            useClass: QueryExceptionFilter,
        },
        {
            // Validation formatting response
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            // Output response using snakecase
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            // Sentry configuration
            provide: APP_INTERCEPTOR,
            useValue: new RavenInterceptor({
                filters: [
                    {
                        type: HttpException,
                        filter: (exception: HttpException) => {
                            return 500 > exception.getStatus();
                        },
                    },
                    {
                        type: EntityNotFoundError,
                        filter: (exception: EntityNotFoundError) =>
                            exception.name === 'EntityNotFoundError',
                    },
                    {
                        type: FindRelationsNotFoundError,
                        filter: (exception: FindRelationsNotFoundError) =>
                            exception.name === 'FindRelationsNotFoundError',
                    },
                    {
                        type: QueryFailedError,
                        filter: () => true,
                    },
                ],
            }),
        },
    ],
})
export class AppModule implements NestModule {
    constructor(@Inject(REDIS) private readonly redisClient: RedisClient) {}

    configure(consumer: MiddlewareConsumer): void {
        // Maintain mode and Pause mode
        consumer
            .apply(MaintainModeMiddleware, PauseModeMiddleware)
            .forRoutes('*');

        consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
        consumer
            .apply(
                session({
                    store: new (RedisStore(session))({
                        client: this.redisClient,
                    }),
                    saveUninitialized: false,
                    secret: 'sup3rs3cr3t',
                    resave: false,
                    cookie: {
                        sameSite: true,
                        httpOnly: false,
                    },
                }),
                passport.initialize(),
                passport.session(),
                CacheCleanMiddleware,
                InertiaSharePropsMiddleware,
                UserDetailMiddleware,
                NotificationUnreadMiddleware,
            )
            .forRoutes('*');
    }
}
