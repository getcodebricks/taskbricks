import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskOverviewEntity } from "shared/infrastructure/persistence/readmodel/TaskOverviewEntity";
import { AppDataSource } from "shared/infrastructure/persistence/AppDataSource";

export class TaskOverviewRepository {
    @OverwriteProtectionBody(false)
    async getTasksByAssigneeId(assigneeId: string): Promise<TaskOverview[]> {
        return await AppDataSource.manager.find(TaskOverviewEntity, {
            where: {
                assigneeId: assigneeId,
            }
        });
    }
}
