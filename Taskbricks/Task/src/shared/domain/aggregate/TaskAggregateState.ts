import { Clock } from "@codebricks/typebricks";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";

export interface TaskAggregateState {
    status: TaskStatusEnum;
}

export const defaultState: TaskAggregateState = {
    status: TaskStatusEnum.Open,
};
