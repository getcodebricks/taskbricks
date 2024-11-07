import { EventMessage, SQSEvent, SQSRecord } from "@codebricks/typebricks";
import { TaskOverviewProjector } from "../application/TaskOverviewProjector";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

export async function handler(event: SQSEvent): Promise<void> {
    try {
        await initDataSource();
        const taskOverviewProjector: TaskOverviewProjector = new TaskOverviewProjector();
        if (event.Records) {
            await Promise.all(event.Records.map(async (record: SQSRecord) => {
                const body = JSON.parse(record.body);
                await taskOverviewProjector.acceptIntoInbox(
                    new EventMessage({
                        streamName: body.streamName,
                        no: body.no,
                        id: body.id,
                        aggregateId: body.aggregateId,
                        aggregateVersion: body.aggregateVersion,
                        name: body.name,
                        payload: body.payload,
                        occurredAt: body.occurredAt,
                        compressed: body.compressed
                    })
                    );
            }));
        }
        await taskOverviewProjector.projectFromInbox();
    } finally {
        await destroyDataSource();
    }
}
