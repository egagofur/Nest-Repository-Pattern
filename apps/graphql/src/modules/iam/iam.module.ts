import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'entities/iam/permission.entity';
import { Role } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import { RoleCrudApplication } from './applications/role-crud.application';
import { PermissionCrudApplication } from './applications/permission-crud.application';
import { UserCrudApplication } from './applications/user-crud.application';
import { RoleResolver } from './resolvers/role.resolver';
import { PermissionResolver } from './resolvers/permission.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import { UserMutation } from './mutations/user.mutation';
import { UserIndexApplication } from './applications/user-index.application';
import { CacheModule } from '../../infrastructure/cache/cache.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Permission]), CacheModule],
    providers: [
        UserIndexApplication,
        UserCrudApplication,
        UserService,
        UserResolver,
        UserMutation,

        RoleCrudApplication,
        RoleService,
        RoleResolver,

        PermissionCrudApplication,
        PermissionService,
        PermissionResolver,
    ],
})
export class IAMModule {}
