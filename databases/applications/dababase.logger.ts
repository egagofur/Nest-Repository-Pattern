import { Span } from '@sentry/tracing';
import { SentryQueryService } from 'apps/backoffice/src/infrastructure/sentry/sentry-query.service';
import { Logger as TypeormLogger } from 'typeorm';

export class DatabaseLogger implements TypeormLogger {
    constructor(
        private sentryQueryService: SentryQueryService,
        private span: Span,
    ) {}

    logQuery(query: string): void {
        const transaction = this.sentryQueryService.startTransaction();
        const span = this.sentryQueryService.startSpan(transaction, query);

        this.span = span;
    }

    logQuerySlow(): void {
        this.sentryQueryService.finishSpan(this.span);
    }

    logQueryError(error: string | Error, query: string): void {
        const transaction = this.sentryQueryService.startTransaction();
        const span = this.sentryQueryService.startSpan(
            transaction,
            'Error' + error + query,
        );

        this.span = span;
    }

    logSchemaBuild() {
        // Method not implemented.
    }
    logMigration() {
        // Method not implemented.
    }
    log() {
        // Method not implemented.
    }
}
