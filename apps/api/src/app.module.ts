import { HttpException, Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RavenInterceptor, RavenModule } from 'nest-raven';
import {
    HttpExceptionFilter,
    EntityNotFoundExceptionFilter,
} from './common/filters/http-exeception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { connectionOption } from './infrastructure/databases';
import { ScheduleModule } from '@nestjs/schedule';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { QueueModule } from './modules/queue/queue.module';
import { AuthModule } from './modules/auth/auth.module';
import { QueryExceptionFilter } from './common/filters/query-failed-error.filter';
import { NotificationModule } from './infrastructure/notification/notification.module';
import { join } from 'path';
import { config } from './config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CacheModule } from './infrastructure/cache/cache.module';
import { CommonModule } from './modules/common/common.module';
import { UserModule } from './modules/user/user.module';
import { ClearCacheController } from './cache/clear-cache.controller';
import { BullModule } from '@nestjs/bull';
import { CacheInterceptor } from './infrastructure/cache/interceptors/cache-interceptor';

@Module({
    imports: [
        TypeOrmModule.forRoot(connectionOption),
        RavenModule,
        QueueModule,
        CacheModule,
        UserModule,
        MailerModule.forRoot({
            // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
            // or
            transport: {
                host: config.mail.smtp.host,
                port: config.mail.smtp.port,
                secure: false,
                auth: {
                    user: config.mail.smtp.user,
                    pass: config.mail.smtp.password,
                },
            },
            defaults: {
                from: `"No Reply" <${config.mail.smtp.emailSender}>`,
            },
            template: {
                dir: join(__dirname, 'infrastructure/mail/templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),

        // write your module here
        NotificationModule,
        AuthModule,
        CommonModule,
        ScheduleModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: config.redis.host,
                port: Number(config.redis.port),
            },
        }),
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
            useClass: QueryExceptionFilter,
        },
        {
            // Not Found Entity Error Handler
            provide: APP_FILTER,
            useClass: EntityNotFoundExceptionFilter,
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
            // Output response using cache
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
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
                        type: QueryFailedError,
                        filter: () => false,
                    },
                    {
                        type: EntityNotFoundError,
                        filter: () => true,
                    },
                    {
                        type: EntityNotFoundError,
                        filter: (exception: EntityNotFoundError) =>
                            exception.name === 'EntityNotFoundError',
                    },
                ],
            }),
        },
    ],
    controllers: [ClearCacheController],
})
export class AppModule {}
