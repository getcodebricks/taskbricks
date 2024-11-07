import { TaskTitleValueObject } from "shared/domain/valueObjects/TaskTitleValueObject";
import { TaskDescriptionValueObject } from "shared/domain/valueObjects/TaskDescriptionValueObject";
import { AssigneeIdValueObject } from "shared/domain/valueObjects/AssigneeIdValueObject";

export interface AddTaskProperties {
    title: TaskTitleValueObject;
    description: TaskDescriptionValueObject;
    assigneeId: AssigneeIdValueObject;
}

export interface CompleteTaskProperties {
}
