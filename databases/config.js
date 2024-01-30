const { config } = require('dotenv');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

config();

module.exports = {
    type: process.env.DB_SERVER,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['entities/**/*.entity.ts'],
    migrations: ['databases/migrations/*.ts'],
    seeds: ['databases/seeds/*.ts'],
    cli: {
        entitiesDir: 'entities',
        migrationsDir: 'databases/migrations',
    },
    namingStrategy: new SnakeNamingStrategy(),
};
