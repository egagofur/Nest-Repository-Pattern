import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(_exception: EntityNotFoundError, _host: ArgumentsHost): void {
        throw new NotFoundException();
    }
}
