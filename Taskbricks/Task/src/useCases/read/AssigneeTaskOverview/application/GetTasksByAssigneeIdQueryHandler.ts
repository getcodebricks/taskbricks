import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskOverviewRepository } from "../infrastructure/TaskOverviewRepository";
import { GetTasksByAssigneeIdQuery } from "./GetTasksByAssigneeIdQuery";

export class GetTasksByAssigneeIdQueryHandler {
    constructor(readonly repository: TaskOverviewRepository = new TaskOverviewRepository()) {
    }

    @OverwriteProtectionBody(false)
    async handle(query: GetTasksByAssigneeIdQuery): Promise<TaskOverview[]> {
        const result: TaskOverview[] = await this.repository.getTasksByAssigneeId(
            query.properties.taskId,
        );
        return result;
    }
}
