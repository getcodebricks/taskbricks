import { CompleteTaskCommand } from "../application/CompleteTaskCommand";
import { CompleteTaskCommandHandler } from "../application/CompleteTaskCommandHandler";
import { ValidationError, OverwriteProtectionBody, NotFoundError, ConflictError, PreconditionFailedError } from "@codebricks/typebricks";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";
import { TaskIdValueObject } from "shared/domain/valueObjects/TaskIdValueObject";

export interface CompleteTaskApiRequest {
    taskId: string;
}

export interface CompleteTaskApiResponseBody {
}

export interface CompleteTaskApiResponse {
    statusCode: number;
    body: string;
    headers: any;
}

export class CompleteTaskApi {
    constructor(readonly commandHandler: CompleteTaskCommandHandler = new CompleteTaskCommandHandler()) {
    }

    @OverwriteProtectionBody(false)
    async handle(request: CompleteTaskApiRequest): Promise<CompleteTaskApiResponse> {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        try {
            const command: CompleteTaskCommand = new CompleteTaskCommand({
                taskId: new TaskIdValueObject(request.taskId),
            });
            const aggregate: TaskAggregate = await this.commandHandler.handleCompleteTask(command);
            return {
                statusCode: 204,
                body: '',
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
