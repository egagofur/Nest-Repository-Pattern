import {
    CanActivate,
    ExecutionContext,
    mixin,
    UnauthorizedException,
} from '@nestjs/common';
import { LoggedInGuard } from './logged-in.guard';
import { Type } from '@nestjs/passport';

export const RoleGuard = (roleKey: string): Type<CanActivate> => {
    class RoleGuardMixin implements LoggedInGuard {
        canActivate(context: ExecutionContext) {
            const user = context.switchToHttp().getRequest().user;
            if (!user) {
                throw new UnauthorizedException('Login first');
            }

            return user.role.key == roleKey;
        }
    }
    return mixin(RoleGuardMixin);
};
