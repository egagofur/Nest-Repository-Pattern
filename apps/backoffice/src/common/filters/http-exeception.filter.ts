import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnprocessableEntityException,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
    Injectable,
    Scope,
    Inject
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import AccessLoginAuthenticatedException from '../../infrastructure/error/access-login-authenticated.exception';
import BadRequestAndRedirectException from '../../infrastructure/error/bad-request-and-redirect.exception';
import { Utils } from '../utils/util';
import { captureException } from '../../infrastructure/sentry/sentry-capture-exception';
import AccessLoginSSOAuthenticatedException from '../../infrastructure/error/access-login-sso-authenticated.exception';
import { FailSafeService } from '../../infrastructure/fail-safe/services/fail-safe.service';
import InternalOpenCircuitException from '../../infrastructure/error/internal-open-circuit-exception.exception';

@Injectable({ scope: Scope.REQUEST })
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly failSafeService: FailSafeService,
    ) {
    }

    async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const path = request.path.slice(1);

        let traceIdFromFe = '';
        let replayIdFromFe = '';

        if (request.headers['baggage']) {
            const baggageHeader = request.headers['baggage'].toString();

            [traceIdFromFe, replayIdFromFe] =
                Utils.splitBaggageHeader(baggageHeader);
        }

        // Capture exception to Sentry
        captureException(exception, request, traceIdFromFe, replayIdFromFe);

        if (exception instanceof UnprocessableEntityException) {
            const exceptionResponse = exception.getResponse();
            const data = exceptionResponse['data'] || null;

            request.session['error'] = {
                errors: data,
                message: exception.message,
                statusCode: exception.getStatus(),
            };

            if (path == 'auth/confirm-forgot-password') {
                const redirectedPathChangePassword =
                    request.originalUrl.replace(path, 'auth/change-password');
                return response.redirect(
                    Utils.pathToUrl(redirectedPathChangePassword),
                );
            }

            return response.redirect(Utils.pathToUrl(path));
        } else if (exception instanceof UnauthorizedException) {
            return response.redirect(Utils.pathToUrl('/auth/login'));
        } else if (exception instanceof InternalOpenCircuitException) {
            return response.redirect(Utils.pathToUrl('/circuit-breaker/feature-close'));
        } else if (exception instanceof ForbiddenException) {
            request.session['error'] = {
                errors: null,
                message: 'Forbidden Access',
                statusCode: exception.getStatus(),
            };

            return response.redirect(Utils.pathToUrl('/forbidden-error'));
        } else if (exception instanceof InternalServerErrorException) {
            await this.failSafeService.catchError(request.originalUrl)
            request.session['error'] = {
                errors: null,
                message: 'Internal Server Error',
                statusCode: exception.getStatus(),
            };
            return response.redirect(Utils.pathToUrl('/server-error'));
        } else if (exception instanceof BadRequestAndRedirectException) {
            request.session['error'] = {
                errors: null,
                message: exception.message,
                statusCode: exception.getStatus(),
            };

            return response.redirect(Utils.pathToUrl(exception.path));
        } else if (exception instanceof AccessLoginAuthenticatedException) {
            return response.redirect(Utils.pathToUrl('/dashboard/page'));
        } else if (exception instanceof AccessLoginSSOAuthenticatedException) {
            return response.redirect(
                301,
                Utils.pathToUrl('/auth/sso-oidc/redirect'),
            );
        } else if (exception instanceof BadRequestException) {
            request.session['error'] = {
                errors: null,
                message: exception.message,
                statusCode: exception.getStatus(),
            };

            return response.redirect(Utils.pathToUrl(path));
        } else if (exception instanceof NotFoundException) {
            request.session['error'] = {
                errors: null,
                message: 'Internal Server Error',
                statusCode: exception.getStatus(),
            };
            return response.redirect(Utils.pathToUrl('/not-found-error'));
        }
    }
}

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = 404;

        const path = request.path.slice(1);

        request.session['error'] = {
            errors: null,
            message: 'Data not found',
            statusCode: status,
        };
        return response.redirect(Utils.pathToUrl(path));
    }
}
