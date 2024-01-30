import { User } from 'entities/iam/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from 'entities/iam/role.entity';
import { Utils } from 'apps/backoffice/src/common/utils/util';
import { IUser } from 'interface-models/iam/user.interface';
import { Logger } from '@nestjs/common';

export class CreateUserAdminSeeder implements Seeder {
    private readonly logger = new Logger(CreateUserAdminSeeder.name);

    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repository = connection.getRepository(User);

        const { data } = require('../dummies/admin.json') as {
            data: IUser[];
        };

        const usersAdmin = await repository.find();

        if (usersAdmin.length <= 0) {
            const roleAdmin = await connection
                .createQueryBuilder(Role, 'role')
                .where({ key: 'admin' })
                .getOne();

            const usersCreate = data.map(async (user) => {
                const userCreate = repository.create();

                userCreate.fullname = user.fullname;
                userCreate.email = user.email;
                userCreate.phoneNumber = user.phoneNumber;
                userCreate.identityNumber = user.identityNumber;
                userCreate.password = await Utils.bcryptHash(user.password);
                userCreate.roles = [roleAdmin];

                return userCreate;
            });

            const saveData = await Promise.all(usersCreate);
            await repository.save(saveData);
        }
    }
}
