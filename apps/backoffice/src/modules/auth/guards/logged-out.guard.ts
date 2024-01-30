import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import AccessLoginAuthenticatedException from 'apps/backoffice/src/infrastructure/error/access-login-authenticated.exception';

@Injectable()
export class LoggedOutGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        if (req.isAuthenticated()) {
            throw new AccessLoginAuthenticatedException();
        }

        return true;
    }
}
