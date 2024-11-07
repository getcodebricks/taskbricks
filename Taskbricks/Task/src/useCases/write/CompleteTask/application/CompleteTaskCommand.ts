import { TaskIdValueObject } from "shared/domain/valueObjects/TaskIdValueObject";

export class CompleteTaskCommand {
    constructor(readonly payload: CompleteTaskCommandPayload) {
    }
}

export interface CompleteTaskCommandPayload {
    taskId: TaskIdValueObject;
}
