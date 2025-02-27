import { SQSEvent, toEventMessages } from "@codebricks/typebricks";
import { TaskOverviewProjector } from "../application/TaskOverviewProjector";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

export async function handler(event: SQSEvent): Promise<void> {
    try {
        await initDataSource();
        const taskOverviewProjector: TaskOverviewProjector = new TaskOverviewProjector();
        await taskOverviewProjector.acceptIntoInbox(toEventMessages(event));
        await taskOverviewProjector.projectFromInbox();
    } finally {
        await destroyDataSource();
    }
}
