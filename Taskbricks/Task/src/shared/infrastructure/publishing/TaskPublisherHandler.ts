import { Publisher, SQSEvent, SQSRecord } from "@codebricks/typebricks";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";
import { TaskOutboxEntity } from "shared/infrastructure/publishing/TaskOutboxEntity";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { AppDataSource, initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

export async function handler(event: SQSEvent) {
    try {
        await initDataSource();
        const publisher: Publisher<TaskOutboxEntity> = new Publisher(AppDataSource, TaskEventStreamEntity, TaskOutboxEntity, TaskAggregate.aggregateName, 'Taskbricks');
        await Promise.all(event.Records.map(async () => {
            await publisher.publish();
        }));
    } finally {
        await destroyDataSource();
    }
}
