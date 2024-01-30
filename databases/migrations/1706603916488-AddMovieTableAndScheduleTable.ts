import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMovieTableAndScheduleTable1706603916488
    implements MigrationInterface
{
    name = 'AddMovieTableAndScheduleTable1706603916488';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`movies\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`overview\` varchar(255) NOT NULL, \`poster\` varchar(255) NOT NULL, \`play_until\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`movie_schedules\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`start_time\` varchar(255) NOT NULL, \`end_time\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`date\` datetime NOT NULL, \`movie_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`movie_schedules\` ADD CONSTRAINT \`FK_1bc9ff80ec0964c8550025acaf7\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`movie_schedules\` DROP FOREIGN KEY \`FK_1bc9ff80ec0964c8550025acaf7\``,
        );
        await queryRunner.query(`DROP TABLE \`movie_schedules\``);
        await queryRunner.query(`DROP TABLE \`movies\``);
    }
}
