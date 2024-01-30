import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1706248957500 implements MigrationInterface {
    name = 'Init1706248957500';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`fullname\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`identity_number\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`one_signal_player_ids\` json NULL, \`email_verified_at\` datetime NULL, \`phone_verified_at\` datetime NULL, \`gender\` varchar(255) NOT NULL, \`birth_date\` datetime NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_43d2ef62e309fe8f4bae2a67e5\` (\`identity_number\`), UNIQUE INDEX \`IDX_17d1817f241f10a3dbafb169fd\` (\`phone_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`log_activities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`meta_data\` json NULL, \`source\` varchar(255) NULL, \`activity\` varchar(255) NOT NULL, \`menu\` varchar(255) NULL, \`path\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`permissions\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_017943867ed5ceef9c03edd974\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`roles\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_a87cf0659c3ac379b339acf36a\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`in_app_notifications\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`target_user_id\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`meta\` json NULL, \`is_read\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`configs\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_03f58fb0f3cccd983dded221bf\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`otps\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`identifier\` varchar(255) NOT NULL, \`trial\` int NOT NULL, \`is_valid\` tinyint NOT NULL DEFAULT 0, \`expired_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`user_roles\` (\`users_id\` int NOT NULL, \`roles_id\` int NOT NULL, INDEX \`IDX_8e1215206acb19f1c38dbda909\` (\`users_id\`), INDEX \`IDX_4a08d003e00caf075a4a212d23\` (\`roles_id\`), PRIMARY KEY (\`users_id\`, \`roles_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`role_permissions\` (\`permissions_id\` int NOT NULL, \`roles_id\` int NOT NULL, INDEX \`IDX_bae04782e4d2b4d4c978528970\` (\`permissions_id\`), INDEX \`IDX_ad074b0f95ff0488162868be2c\` (\`roles_id\`), PRIMARY KEY (\`permissions_id\`, \`roles_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`log_activities\` ADD CONSTRAINT \`FK_4357a91cbef922677d73d510f70\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`in_app_notifications\` ADD CONSTRAINT \`FK_046713440a98830b619c4c649b4\` FOREIGN KEY (\`target_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_8e1215206acb19f1c38dbda9091\` FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_4a08d003e00caf075a4a212d23d\` FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_bae04782e4d2b4d4c978528970c\` FOREIGN KEY (\`permissions_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_ad074b0f95ff0488162868be2c7\` FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_ad074b0f95ff0488162868be2c7\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_bae04782e4d2b4d4c978528970c\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_4a08d003e00caf075a4a212d23d\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_8e1215206acb19f1c38dbda9091\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`in_app_notifications\` DROP FOREIGN KEY \`FK_046713440a98830b619c4c649b4\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`log_activities\` DROP FOREIGN KEY \`FK_4357a91cbef922677d73d510f70\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_ad074b0f95ff0488162868be2c\` ON \`role_permissions\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_bae04782e4d2b4d4c978528970\` ON \`role_permissions\``,
        );
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_4a08d003e00caf075a4a212d23\` ON \`user_roles\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_8e1215206acb19f1c38dbda909\` ON \`user_roles\``,
        );
        await queryRunner.query(`DROP TABLE \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`otps\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_03f58fb0f3cccd983dded221bf\` ON \`configs\``,
        );
        await queryRunner.query(`DROP TABLE \`configs\``);
        await queryRunner.query(`DROP TABLE \`in_app_notifications\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_a87cf0659c3ac379b339acf36a\` ON \`roles\``,
        );
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_017943867ed5ceef9c03edd974\` ON \`permissions\``,
        );
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`log_activities\``);
        await queryRunner.query(
            `DROP INDEX \`IDX_17d1817f241f10a3dbafb169fd\` ON \`users\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_43d2ef62e309fe8f4bae2a67e5\` ON \`users\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
        );
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
