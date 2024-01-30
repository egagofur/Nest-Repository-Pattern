import { Module } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryService } from './sentry.service';
import { SentryInterceptor } from '../../common/interceptors/sentry.interceptor';
import { SentryQueryService } from './sentry-query.service';
import { config } from '../../config';
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS';

@Module({ providers: [SentryService, SentryQueryService] })
export class SentryModule {
    static forRoot() {
        const options: Sentry.NodeOptions = config.sentry.dsn && {
            dsn: config.sentry.dsn,
            attachStacktrace: true,
            debug: false,
            environment: config.nodeEnv,
            ignoreErrors: [
                'EntityNotFoundError',
                'QueryFailedError',
                'FindRelationsNotFoundError',
            ],
            tracesSampleRate: 1.0,
        };

        Sentry.init(options);

        return {
            module: SentryModule,
            SentryService,
            SentryQueryService,
            providers: [
                {
                    provide: SENTRY_OPTIONS,
                    useValue: options,
                },
                {
                    provide: APP_INTERCEPTOR,
                    useClass: SentryInterceptor,
                },
            ],
            exports: [SentryService, SentryQueryService],
        };
    }
}
