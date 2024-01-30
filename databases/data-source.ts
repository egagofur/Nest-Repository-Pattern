import { Span } from '@sentry/tracing';
import { config } from 'apps/backoffice/src/config';
import { DatabaseLogger } from 'databases/applications/dababase.logger';
import { DataSource, DataSourceOptions, createConnection } from 'typeorm';
import { SentryQueryService } from '../apps/backoffice/src/infrastructure/sentry/sentry-query.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const isCli = !!process.argv[2];

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: config.database.host,
    port: +config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: isCli
        ? ['entities/**/*.entity.ts']
        : ['dist/entities/**/*.entity.js'],
    synchronize: false,
    logging: !!isCli || config.nodeEnv === 'local',
    charset: 'utf8mb4_unicode_ci',
    namingStrategy: new SnakeNamingStrategy(),
    maxQueryExecutionTime: +config.database.maxQueryExecutionTimeInMs,
    logger: !isCli
        ? new DatabaseLogger(new SentryQueryService(), new Span())
        : undefined,
    migrations: isCli
        ? ['databases/migrations/*.ts']
        : ['dist/databases/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
!isCli && createConnection(dataSourceOptions);

export default dataSource;
