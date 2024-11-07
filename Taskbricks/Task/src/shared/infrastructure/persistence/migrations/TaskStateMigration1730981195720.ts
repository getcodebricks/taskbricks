import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { OverwriteProtectionBody } from "@codebricks/typebricks";

export class TaskStateMigration1730981195720 implements MigrationInterface {
    name = 'TaskStateMigration1730981195720';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'task_state',
                    columns: [
                        { name: 'aggregate_id', type: 'uuid', isPrimary: true },
                        { name: 'aggregate_version', type: 'int' },
                        { name: 'state', type: 'text' },
                    ],
                }
            )
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task_state');
    }
}
