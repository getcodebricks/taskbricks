import { TaskTitleValueObject } from "shared/domain/valueObjects/TaskTitleValueObject";
import { TaskDescriptionValueObject } from "shared/domain/valueObjects/TaskDescriptionValueObject";
import { AssigneeIdValueObject } from "shared/domain/valueObjects/AssigneeIdValueObject";

export class AddTaskCommand {
    constructor(readonly payload: AddTaskCommandPayload) {
    }
}

export interface AddTaskCommandPayload {
    title: TaskTitleValueObject;
    description: TaskDescriptionValueObject;
    assigneeId: AssigneeIdValueObject;
}
