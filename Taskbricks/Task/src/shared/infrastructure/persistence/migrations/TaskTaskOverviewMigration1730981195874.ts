import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TaskTaskOverviewMigration1730981195874 implements MigrationInterface {
    name = 'TaskTaskOverviewMigration1730981195874';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'task_task_overview',
                    columns: [
                        { name: 'task_id', type: 'uuid', isPrimary: true },
                        { name: 'title', type: 'text' },
                        { name: 'description', type: 'text' },
                        { name: 'assignee_id', type: 'uuid' },
                        { name: 'status', type: 'text' },
                    ],
                }
            )
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task_task_overview');
    }
}
