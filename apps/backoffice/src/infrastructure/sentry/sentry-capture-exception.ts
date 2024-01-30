import { Request } from 'express';
import { HttpException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import * as Sentry from '@sentry/node';
import { config } from 'apps/backoffice/src/config';

export const captureException = (
    error: HttpException | QueryFailedError,
    request: Request,
    traceId: string,
    replayId: string,
): string => {
    const exceptionEventId = Sentry.captureException(error, (scope) => {
        scope.setSpan(Sentry.startTransaction({
            name: request.url,
            op: 'exception',
            status: 'ok',
            traceId: traceId,
        }));

        scope.setContext('http', {
            method: request.method,
            url: request.url,
            headers: request.headers,
        });

        if (replayId) {
            scope.setTag(
                'replay', 
                `https://${config.sentry.organizationSlug}/replays/${replayId}/?project=${config.sentry.projectIdentifierNumber}`
            );
        }

        scope.getSpan().startChild({
            op: 'child-span',
            description: 'child-span description'
        })

        return scope;
    });

    return exceptionEventId;
};
