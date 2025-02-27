import { CompleteTaskCommand } from "../application/CompleteTaskCommand";
import { CompleteTaskCommandHandler } from "../application/CompleteTaskCommandHandler";
import { OverwriteProtectionBody, ApiResponse, defaultCORSHeaders, renderErrorResponse } from "@codebricks/typebricks";
import { TaskIdValueObject } from "shared/domain/valueObjects/TaskIdValueObject";

export interface CompleteTaskApiRequest {
    taskId: string;
}

export interface CompleteTaskApiResponseBody {
}

export class CompleteTaskApi {
    constructor(readonly commandHandler: CompleteTaskCommandHandler = new CompleteTaskCommandHandler()) {
    }

    @OverwriteProtectionBody(false)
    async handle(request: CompleteTaskApiRequest): Promise<ApiResponse<CompleteTaskApiResponseBody>> {
        try {
            const command: CompleteTaskCommand = new CompleteTaskCommand({
                taskId: new TaskIdValueObject(request.taskId),
            });
            await this.commandHandler.handleCompleteTask(command);
            return {
                statusCode: 204,
                body: {},
                headers: defaultCORSHeaders,
            };
        } catch (error) {
            console.log(error);
            return renderErrorResponse(error);
        }
    }
}
