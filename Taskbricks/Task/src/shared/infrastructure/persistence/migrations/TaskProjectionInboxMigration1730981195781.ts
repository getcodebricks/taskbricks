import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { OverwriteProtectionBody } from "@codebricks/typebricks";

export class TaskProjectionInboxMigration1730981195781 implements MigrationInterface {
    name = 'TaskProjectionInboxMigration1730981195781';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'task_projection_inbox',
                    columns: [
                        { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
                        { name: 'no', type: 'int' },
                        { name: 'projection_name', type: 'varchar' },
                        { name: 'stream_name', type: 'varchar' },
                        { name: 'message', type: 'text' },
                    ],
                    uniques: [
                        { columnNames: ['no', 'projection_name', 'stream_name'] },
                    ]
                }
            )
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task_projection_inbox');
    }
}
