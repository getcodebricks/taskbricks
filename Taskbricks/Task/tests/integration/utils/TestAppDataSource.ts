import { DataSource } from "typeorm";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { TaskOutboxEntity } from "shared/infrastructure/publishing/TaskOutboxEntity";
import { TaskStateEntity } from "shared/infrastructure/persistence/aggregate/TaskStateEntity";
import { TaskProjectionInboxEntity } from "shared/infrastructure/consuming/TaskProjectionInboxEntity";
import { TaskProjectionPositionEntity } from "shared/infrastructure/consuming/TaskProjectionPositionEntity";
import { TaskOverviewEntity } from "shared/infrastructure/persistence/readmodel/TaskOverviewEntity";

export const TestAppDataSource = new DataSource({
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
});

export async function initDataSource(): Promise<void> {
    if (!TestAppDataSource.isInitialized) {
        await TestAppDataSource.initialize()
        .then(() => {})
        .catch((err: any) => {
            console.error("Error during Data Source initialization", err);
        });
    }
}

export async function destroyDataSource(): Promise<void> {
    if (TestAppDataSource.isInitialized) {
        await TestAppDataSource.destroy();
    }
}
