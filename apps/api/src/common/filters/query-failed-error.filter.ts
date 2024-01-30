import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import {
    CODE_10001,
    CODE_10002,
    CODE_10003,
    CODE_10004,
} from '../constants/error.constant';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost): void {
        let message = 'Error Query';
        let status = 500;

        if (exception.message.includes('Duplicate entry')) {
            if (exception.message.includes('UQ_7130a96c710ebeb55bd0bc80d6d')) {
                message = CODE_10002.message;
                status = CODE_10002.status;
            } else if (
                exception.message.includes('IDX_97672ac88f789774dd47f7c8be') ||
                exception.message.includes('UQ_IDX_EMAIL_DELETE')
            ) {
                message = CODE_10004.message;
                status = CODE_10004.status;
            } else if (
                exception.message.includes('62') ||
                exception.message.includes('UQ_IDX_PHONE_DELETE')
            ) {
                message = CODE_10001.message;
                status = CODE_10001.status;
            }
        } else if (exception.message.includes('deposits_base_id_fkey')) {
            message = CODE_10003.message;
            status = CODE_10003.status;
        }

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(status).json({
            message: message,
            errors: null,
        });
        return;
    }
}
