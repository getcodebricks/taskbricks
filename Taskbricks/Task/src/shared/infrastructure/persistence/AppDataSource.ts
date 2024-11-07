import { DataSource } from "typeorm";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { TaskOutboxEntity } from "shared/infrastructure/publishing/TaskOutboxEntity";
import { TaskStateEntity } from "shared/infrastructure/persistence/aggregate/TaskStateEntity";
import { TaskProjectionInboxEntity } from "shared/infrastructure/consuming/TaskProjectionInboxEntity";
import { TaskProjectionPositionEntity } from "shared/infrastructure/consuming/TaskProjectionPositionEntity";
import { TaskOverviewEntity } from "shared/infrastructure/persistence/readmodel/TaskOverviewEntity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
    logging: false,
    synchronize: false,
    url: process.env.POSTGRES_URL,
    migrationsTableName: 'task_migrations',
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    entities: [
        TaskEventStreamEntity,
        TaskOutboxEntity,
        TaskStateEntity,
        TaskProjectionInboxEntity,
        TaskProjectionPositionEntity,
        TaskOverviewEntity,
    ],
    migrations: [__dirname + '/migrations/*.ts']
});
export var QueryRunner = AppDataSource.createQueryRunner();;

export async function initDataSource(): Promise<void> {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
        .then(() => {})
        .catch((err: any) => {
            console.error("Error during Data Source initialization", err);
        });
    }
    if (QueryRunner.isReleased) {
        QueryRunner = AppDataSource.createQueryRunner();
    }
}

export async function destroyDataSource(): Promise<void> {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
    if(!QueryRunner.isReleased) {
        await QueryRunner.release();
    }
}
