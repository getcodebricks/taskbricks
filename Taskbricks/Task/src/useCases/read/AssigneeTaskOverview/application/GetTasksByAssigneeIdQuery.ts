import { isType } from "is-what";
import { validate } from "uuid";
import { OverwriteProtectionBody, ValidationError } from "@codebricks/typebricks";

export interface GetTasksByAssigneeIdQueryProperties {
    taskId: string;
}

export class GetTasksByAssigneeIdQuery {
    constructor(readonly properties: GetTasksByAssigneeIdQueryProperties) {
        this.validate();
    }

    @OverwriteProtectionBody(false)
    validate(): void {
        if (!validate(this.properties.taskId)) {
            throw new ValidationError('taskId is invalid');
        }
    }
}
