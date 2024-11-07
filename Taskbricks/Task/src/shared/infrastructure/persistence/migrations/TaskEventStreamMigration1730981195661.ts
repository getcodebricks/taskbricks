import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { OverwriteProtectionBody } from "@codebricks/typebricks";

export class TaskEventStreamMigration1730981195661 implements MigrationInterface {
    name = 'TaskEventStreamMigration1730981195661';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'task_event_stream',
                    columns: [
                        { name: 'id', type: 'uuid', isPrimary: true },
                        { name: 'no', type: 'int', isNullable: true },
                        { name: 'aggregate_id', type: 'uuid' },
                        { name: 'aggregate_version', type: 'int' },
                        { name: 'name', type: 'varchar' },
                        { name: 'payload', type: 'text' },
                        { name: 'occurred_at', type: 'timestamptz', default: 'now()' },
                    ],
                    uniques: [
                        { columnNames: ['aggregate_id', 'aggregate_version'] },
                    ]
                }
            )
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task_event_stream');
    }
}
