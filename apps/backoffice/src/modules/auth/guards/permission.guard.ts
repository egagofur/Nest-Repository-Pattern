import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    mixin,
    UnauthorizedException,
} from '@nestjs/common';
import { Type } from '@nestjs/passport';
import { User } from 'entities/iam/user.entity';
import { getManager } from 'typeorm';

export const PermissionGuard = (permissionKey: string): Type<CanActivate> => {
    class PermissionGuardMixin {
        async canActivate(context: ExecutionContext): Promise<boolean> {
            const userLogin = context.switchToHttp().getRequest().user;
            if (!userLogin) {
                throw new UnauthorizedException('Login first');
            }

            const user = await getManager()
                .getRepository(User)
                .findOneOrFail({
                    where: { id: userLogin.id },
                    relations: ['roles', 'roles.permissions'],
                });
            const roles = user?.roles;
            for (let i = 0; i < roles.length; i++) {
                const permissionKeys = roles[i].permissions.map(
                    (permission) => permission.key,
                );
                if (permissionKeys.includes(permissionKey)) {
                    return true;
                } else {
                    if (i == roles.length - 1) {
                        throw new ForbiddenException('Not allowed');
                    }
                }
            }
            return true;
        }
    }
    return mixin(PermissionGuardMixin);
};
