import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';
import { Utils } from '../utils/util';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const path = request.path.slice(1);

        if (
            exception.message.includes(
                'Cannot delete or update a parent row',
            ) &&
            path.includes('/delete')
        ) {
            const pathIndex = path.split('/')[0];
            request.session['error'] = {
                errors: null,
                message: 'Cannot delete, this data is used at another resource',
                statusCode: 400,
            };

            return response.redirect(Utils.pathToUrl(`/${pathIndex}`));
        }

        return response.redirect(Utils.pathToUrl('/server-error'));
    }
}
