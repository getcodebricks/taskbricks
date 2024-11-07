import { ProjectionRecreator } from "@codebricks/typebricks";
import { TaskOverviewProjector } from "../application/TaskOverviewProjector";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

export async function handler(): Promise<void> {
    try {
        await initDataSource();
        const taskOverviewProjector: TaskOverviewProjector = new TaskOverviewProjector();
        const taskOverviewRecreator: ProjectionRecreator = new ProjectionRecreator(taskOverviewProjector);
        await taskOverviewRecreator.recreateProjection();
    } finally {
        await destroyDataSource();
    }
}
