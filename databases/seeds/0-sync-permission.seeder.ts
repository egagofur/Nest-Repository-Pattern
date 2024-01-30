import { Connection, In } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as permissions from 'constants/permission.constant';

import { Permission } from '../../entities/iam/permission.entity';
import { Logger } from '@nestjs/common';

export class SyncPermissionSeeder implements Seeder {
    private readonly logger = new Logger(SyncPermissionSeeder.name);

    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repository = connection.getRepository(Permission);

        const datax = await repository.find();
        if (datax.length <= 0) {
            const permissionConstants = [
                permissions.PERMISSION_BACKOFFICE_SHOW_CONFIG,
                permissions.PERMISSION_BACKOFFICE_DETAIL_CONFIG,
                permissions.PERMISSION_BACKOFFICE_UPDATE_CONFIG,
                permissions.PERMISSION_BACKOFFICE_CREATE_CONFIG,
                permissions.PERMISSION_BACKOFFICE_DELETE_CONFIG,

                permissions.PERMISSION_BACKOFFICE_SHOW_LOG_ACTIVITY,
                permissions.PERMISSION_BACKOFFICE_DETAIL_LOG_ACTIVITY,

                permissions.PERMISSION_BACKOFFICE_SHOW_USER,
                permissions.PERMISSION_BACKOFFICE_DETAIL_USER,
                permissions.PERMISSION_BACKOFFICE_UPDATE_USER,
                permissions.PERMISSION_BACKOFFICE_CREATE_USER,
                permissions.PERMISSION_BACKOFFICE_DELETE_USER,

                permissions.PERMISSION_BACKOFFICE_SHOW_ROLE,
                permissions.PERMISSION_BACKOFFICE_DETAIL_ROLE,
                permissions.PERMISSION_BACKOFFICE_UPDATE_ROLE,
                permissions.PERMISSION_BACKOFFICE_CREATE_ROLE,
                permissions.PERMISSION_BACKOFFICE_DELETE_ROLE,

                permissions.PERMISSION_BACKOFFICE_SHOW_PERMISSION,
                permissions.PERMISSION_BACKOFFICE_DETAIL_PERMISSION,
                permissions.PERMISSION_BACKOFFICE_UPDATE_PERMISSION,
            ];

            const permissionExists = await repository.findBy({
                key: In(permissionConstants),
            });

            const permissionExistsKey = permissionExists.map(
                (data) => data.key,
            );

            const permissionSync = permissionConstants.map(
                async (permissionKey) => {
                    if (!permissionExistsKey.includes(permissionKey)) {
                        const newPermission = repository.create();

                        newPermission.key = permissionKey;
                        newPermission.name = permissionKey
                            .split('-')
                            .join(' ')
                            .toUpperCase();

                        return newPermission;
                    }
                },
            );

            const saveData = await Promise.all(permissionSync);
            await repository.save(saveData);
        }
    }
}
