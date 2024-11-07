import { AddTaskCommand } from "../application/AddTaskCommand";
import { AddTaskCommandHandler } from "../application/AddTaskCommandHandler";
import { ValidationError, OverwriteProtectionBody, NotFoundError, ConflictError, PreconditionFailedError } from "@codebricks/typebricks";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";
import { TaskTitleValueObject } from "shared/domain/valueObjects/TaskTitleValueObject";
import { TaskDescriptionValueObject } from "shared/domain/valueObjects/TaskDescriptionValueObject";
import { AssigneeIdValueObject } from "shared/domain/valueObjects/AssigneeIdValueObject";

export interface AddTaskApiRequest {
    title: string;
    description: string;
    assigneeId: string;
}

export interface AddTaskApiResponseBody {
    taskId: string;
}

export interface AddTaskApiResponse {
    statusCode: number;
    body: string;
    headers: any;
}

export class AddTaskApi {
    constructor(readonly commandHandler: AddTaskCommandHandler = new AddTaskCommandHandler()) {
    }

    @OverwriteProtectionBody(false)
    async handle(request: AddTaskApiRequest): Promise<AddTaskApiResponse> {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        try {
            const command: AddTaskCommand = new AddTaskCommand({
                title: new TaskTitleValueObject(request.title),
                description: new TaskDescriptionValueObject(request.description),
                assigneeId: new AssigneeIdValueObject(request.assigneeId),
            });
            const aggregate: TaskAggregate = await this.commandHandler.handleAddTask(command);
            const responseBody: AddTaskApiResponseBody = {
                taskId: aggregate.id,
            };
            return {
                statusCode: 200,
                body: JSON.stringify({ data: responseBody }),
                headers: headers
            };
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: error.message }),
                    headers: headers
                };
            } else if (error instanceof SyntaxError && error.message.match(/Unexpected.token.*JSON.*/i)) {
                return {
                    statusCode: 400,
                    body: '{ "error": "bad request: invalid json"}',
                    headers: headers
                };
            } else if (error instanceof NotFoundError) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ error: error.message }),
                    headers: headers
                };
            } else if (error instanceof ConflictError) {
                return {
                    statusCode: 409,
                    body: JSON.stringify({ error: error.message }),
                    headers: headers
                };
            } else if (error instanceof PreconditionFailedError) {
                return {
                    statusCode: 412,
                    body: JSON.stringify({ error: error.message }),
                    headers: headers
                };
            }

            return {
                statusCode: 500,
                body: '{ "error": "Internal Server Error"}',
                headers: headers
            };
        }
    }
}
