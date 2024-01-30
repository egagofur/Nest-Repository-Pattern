import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { InertiaAdapter } from '../../infrastructure/inertia/adapter/inertia.adapter';
import { UserCrudService } from './services/user-crud.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { RoleCrudService } from './services/role-crud.service';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repositories/role.repository';
import { Role } from 'entities/iam/role.entity';
import { PermissionCrudService } from './services/permission-crud.service';
import { PermissionRepository } from './repositories/permission.repository';
import { Permission } from 'entities/iam/permission.entity';
import { PermissionController } from './controllers/permission.controller';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { LdapService } from '../auth/services/ldap.service';
import { AbilityModule } from '../../infrastructure/ability/ability.module';
import { PaginateUtil } from '../../common/utils/paginate.util';
import { LogActivityModule } from '../log-activity/log-activity.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Permission, LogActivity]),
        CacheModule,
        AbilityModule,
        LogActivityModule,
    ],
    controllers: [UserController, RoleController, PermissionController],
    providers: [
        PaginateUtil,
        LdapService,
        InertiaAdapter,
        UserCrudService,
        UserRepository,
        RoleCrudService,
        RoleRepository,
        PermissionCrudService,
        PermissionRepository,
    ],
    exports: [UserCrudService],
})
export class IamModule {}
