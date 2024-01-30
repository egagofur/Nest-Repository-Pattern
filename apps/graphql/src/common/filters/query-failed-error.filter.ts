import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
    catch(_exception: QueryFailedError, _host: ArgumentsHost): void {
        throw new InternalServerErrorException();
    }
}
