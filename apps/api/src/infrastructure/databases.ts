import { config } from 'apps/api/src/config';
import { Config } from 'entities/config/config.entity';
import { Permission } from 'entities/iam/permission.entity';
import { Role } from 'entities/iam/role.entity';
import { User } from 'entities/iam/user.entity';
import { LogActivity } from 'entities/log-activity/log-activity.entity';
import { InAppNotification } from 'entities/notification/in-app-notification.entity';
import { Otp } from 'entities/otp/otp.entity';

import { ConnectionOptions, createConnection } from 'typeorm';

export const connectionOption: ConnectionOptions = {
    type: 'mysql',
    host: config.database.host,
    port: +config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: [
        User,
        Role,
        Otp,
        Permission,
        InAppNotification,
        Config,
        LogActivity,
    ],
    synchronize: false,
    logging: config.nodeEnv === 'local',
    charset: 'utf8mb4_unicode_ci',
};

export const databaseConnection = createConnection(connectionOption);
