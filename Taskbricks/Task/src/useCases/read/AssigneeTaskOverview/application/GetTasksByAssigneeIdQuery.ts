import { isType } from "is-what";
import { validate } from "uuid";
import { OverwriteProtectionBody, ValidationError } from "@codebricks/typebricks";

export interface GetTasksByAssigneeIdQueryProperties {
    assigneeId: string;
}

export class GetTasksByAssigneeIdQuery {
    constructor(readonly properties: GetTasksByAssigneeIdQueryProperties) {
        this.validate();
    }

    @OverwriteProtectionBody(false)
    validate(): void {
        if (!validate(this.properties.assigneeId)) {
            throw new ValidationError('assigneeId is invalid');
        }
    }
}
