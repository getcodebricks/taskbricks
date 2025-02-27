import { AddTaskCommand } from "../application/AddTaskCommand";
import { AddTaskCommandHandler } from "../application/AddTaskCommandHandler";
import { OverwriteProtectionBody, ApiResponse, defaultCORSHeaders, renderErrorResponse } from "@codebricks/typebricks";
import { TaskTitleValueObject } from "shared/domain/valueObjects/TaskTitleValueObject";
import { TaskDescriptionValueObject } from "shared/domain/valueObjects/TaskDescriptionValueObject";
import { AssigneeIdValueObject } from "shared/domain/valueObjects/AssigneeIdValueObject";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";

export interface AddTaskApiRequest {
    title: string;
    description: string;
    assigneeId: string;
}

export interface AddTaskApiResponseBody {
    taskId: string;
}

export class AddTaskApi {
    constructor(readonly commandHandler: AddTaskCommandHandler = new AddTaskCommandHandler()) {
    }

    @OverwriteProtectionBody(false)
    async handle(request: AddTaskApiRequest): Promise<ApiResponse<AddTaskApiResponseBody>> {
        try {
            const command: AddTaskCommand = new AddTaskCommand({
                title: new TaskTitleValueObject(request.title),
                description: new TaskDescriptionValueObject(request.description),
                assigneeId: new AssigneeIdValueObject(request.assigneeId),
            });
            const aggregate: TaskAggregate = await this.commandHandler.handleAddTask(command);
            return {
                statusCode: 200,
                body: {
                    data: {
                        taskId: aggregate.id,
                    },
                },
                headers: defaultCORSHeaders,
            };
        } catch (error) {
            console.log(error);
            return renderErrorResponse(error);
        }
    }
}
