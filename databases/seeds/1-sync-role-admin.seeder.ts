import { Logger } from '@nestjs/common';
import { Permission } from 'entities/iam/permission.entity';
import { Role } from 'entities/iam/role.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class SyncRoleAdminSeeder implements Seeder {
    private readonly logger = new Logger(SyncRoleAdminSeeder.name);

    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repository = connection.getRepository(Role);

        const { data } = require('../dummies/roles.json') as {
            data: string[];
        };

        const permissions = await connection.getRepository(Permission).find();

        const roleSync = data.map(async (roleKey) => {
            const roleExist = await repository.findOne({
                where: { key: roleKey },
            });

            const role = roleExist || repository.create();

            role.name = roleKey;
            role.key = roleKey;
            role.permissions = permissions;

            return role;
        });

        const saveData = await Promise.all(roleSync);
        await repository.save(saveData);
    }
}
