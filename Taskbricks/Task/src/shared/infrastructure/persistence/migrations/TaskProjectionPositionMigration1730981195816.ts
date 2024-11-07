import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { OverwriteProtectionBody } from "@codebricks/typebricks";

export class TaskProjectionPositionMigration1730981195816 implements MigrationInterface {
    name = 'TaskProjectionPositionMigration1730981195816';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'task_projection_position',
                    columns: [
                        { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
                        { name: 'projection_name', type: 'varchar' },
                        { name: 'stream_name', type: 'varchar' },
                        { name: 'last_projected_no', type: 'int' },
                        { name: 'updated_at', type: 'timestamptz', default: 'now()' },
                    ],
                    uniques: [
                        { columnNames: ['projection_name', 'stream_name'] },
                    ]
                }
            )
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task_projection_position');
    }
}
