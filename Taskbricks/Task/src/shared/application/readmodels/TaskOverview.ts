import { Clock } from "@codebricks/typebricks";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";

export interface TaskOverview {
    taskId: string;
    title: string;
    description: string;
    assigneeId: string;
    status: TaskStatusEnum;
}

export const defaultTaskOverview: TaskOverview = {
        taskId: '',
        title: '',
        description: '',
        assigneeId: '',
        status: TaskStatusEnum.Open,
    };
