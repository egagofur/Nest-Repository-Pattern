import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Config } from 'entities/config/config.entity';

export class CreateConfigSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        connection.manager.transaction(async (manager) => {
            const { data } = require('../dummies/config.json') as {
                data: Config[];
            };

            const datax = await manager.find(Config);

            if (datax.length <= 0) {
                const configCreate = data.map(async (config) => {
                    const configCreate = manager.create(Config);

                    configCreate.key = config.key;
                    configCreate.value = config.value;

                    return configCreate;
                });

                await manager.save(configCreate);
            }
        });
    }
}
