import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1730232523690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                age INT NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE users`);
    }

}
