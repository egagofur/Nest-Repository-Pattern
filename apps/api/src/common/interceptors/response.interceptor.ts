import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { Utils } from '../utils/util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest() as Request;

        return next.handle().pipe(
            map((data) => {
                if (data?.data) {
                    data.data = Utils.snakeCaseKey(data.data);
                    data.data = Utils.parseDatetime(
                        data.data,
                        request.headers['timezone'] != undefined
                            ? request.headers['timezone']?.toString()
                            : config.timezone,
                    );
                }

                if (data?.meta) {
                    data.meta = Utils.snakeCaseKey(data.meta);
                    data.meta = Utils.parseDatetime(
                        data.meta,
                        request.headers['timezone'] != undefined
                            ? request.headers['timezone']?.toString()
                            : config.timezone,
                    );
                }

                return data;
            }),
        );
    }
}
