import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { faker } from "@faker-js/faker";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";

export interface GivenTaskOverviewProperties {
    taskId?: string;
    title?: string;
    description?: string;
    assigneeId?: string;
    status?: TaskStatusEnum;
}

export class GivenTaskOverview {
    @OverwriteProtectionBody(false)
    static readModel(properties: GivenTaskOverviewProperties): TaskOverview {
        return {
            taskId: properties.taskId ?? faker.string.uuid(),
            title: properties.title ?? faker.string.alpha(),
            description: properties.description ?? faker.string.alpha(),
            assigneeId: properties.assigneeId ?? faker.string.uuid(),
            status: properties.status ?? faker.helpers.enumValue(TaskStatusEnum),
        };
    }
}
