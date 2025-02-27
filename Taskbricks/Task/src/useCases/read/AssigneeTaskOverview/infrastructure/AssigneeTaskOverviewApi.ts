import { OverwriteProtectionBody, ApiResponse, defaultCORSHeaders, renderErrorResponse } from "@codebricks/typebricks";
import { GetTasksByAssigneeIdQuery } from "../application/GetTasksByAssigneeIdQuery";
import { GetTasksByAssigneeIdQueryHandler } from "../application/GetTasksByAssigneeIdQueryHandler";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";

export interface AssigneeTaskOverviewApiRequest {
    assigneeId: string;
}

export class AssigneeTaskOverviewApi {
    constructor(readonly queryHandler: GetTasksByAssigneeIdQueryHandler = new GetTasksByAssigneeIdQueryHandler()) {
    }

    @OverwriteProtectionBody(false)
    async handle(request: AssigneeTaskOverviewApiRequest): Promise<ApiResponse<TaskOverview[]>> {
        try {
            const query: GetTasksByAssigneeIdQuery = new GetTasksByAssigneeIdQuery({
                assigneeId: request.assigneeId,
            });
            const result: TaskOverview[] = await this.queryHandler.handle(query);
            return {
                statusCode: 200,
                body: {
                    data: result,
                },
                headers: defaultCORSHeaders,
            };
        } catch (error) {
            console.log(error);
            return renderErrorResponse(error);
        }
    }
}
