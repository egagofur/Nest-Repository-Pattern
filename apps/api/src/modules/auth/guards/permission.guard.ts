import { ExecutionContext, ForbiddenException, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const PermissionGuard = (permissionKey: string): any => {
    class PermissionGuardMixin extends AuthGuard('jwt') {
        canActivate(context: ExecutionContext) {
            const user = context.switchToHttp().getRequest().user;

            const permissionKeys = user.role.permissions.map(
                (permission) => permission.key,
            );
            if (!permissionKeys.includes(permissionKey)) {
                throw new ForbiddenException('Not allowed');
            }

            return true;
        }
    }

    const guard = mixin(PermissionGuardMixin);
    return guard;
};
