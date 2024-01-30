// src/auth/login.guard.ts
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AccessLoginSSOAuthenticatedException from 'apps/backoffice/src/infrastructure/error/access-login-sso-authenticated.exception';
import { Request } from 'express';

@Injectable()
export class OidcGuard extends AuthGuard('oidc') {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;
        try {
            const result = (await super.canActivate(context)) as boolean;
            await super.logIn(request);
            return result;
        } catch (err) {
            if (
                request.query['code'] &&
                request.query['state'] &&
                request.query['session_state']
            ) {
                throw new AccessLoginSSOAuthenticatedException();
            }

            throw new UnauthorizedException();
        }
    }
}
