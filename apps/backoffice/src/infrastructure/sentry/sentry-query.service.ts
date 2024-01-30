import { Span, Transaction } from '@sentry/tracing';
import * as Sentry from '@sentry/node';

export class SentryQueryService {
    startTransaction(): Transaction {
        const transaction = Sentry.getCurrentHub().getScope().getTransaction();
        if (transaction) return transaction as unknown as Transaction;
    }

    startSpan(transaction: Transaction, query: string): Span {
        if (transaction) {
            return transaction.startChild({
                op: 'db.sql.query',
                description: query,
                status: 'ok',
            });
        }
    }

    finishSpan(span: Span) {
        if (span?.data) {
            try {
                span.setStatus('ok');
            } catch (err) {
                span.setStatus(err);
                throw err;
            } finally {
                span.finish();
            }
        }
    }

    finishTransaction(transaction: Transaction) {
        if (transaction) {
            try {
                transaction.finish();
            } catch (err) {
                transaction.setStatus(err);
                throw err;
            }
        }
    }
}
