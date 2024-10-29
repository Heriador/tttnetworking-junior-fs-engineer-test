import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1730228325491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                status VARCHAR(255) NOT NULL DEFAULT 'pending',
                end_date DATE NOT NULL,
                userId INTEGER NOT NULL
            );
       `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE tasks`);
    }

}
