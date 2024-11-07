import { ValidationError, NotFoundError, OverwriteProtectionBody } from "@codebricks/typebricks";
import { GetTasksByAssigneeIdQuery } from "../application/GetTasksByAssigneeIdQuery";
import { GetTasksByAssigneeIdQueryHandler } from "../application/GetTasksByAssigneeIdQueryHandler";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";

export interface AssigneeTaskOverviewApiRequest {
    assigneeId: string;
}

export interface AssigneeTaskOverviewApiResponse {
    statusCode: number;
    body: string;
    headers: any;
}

export class AssigneeTaskOverviewApi {
    constructor(readonly queryHandler: GetTasksByAssigneeIdQueryHandler = new GetTasksByAssigneeIdQueryHandler()) {
    }

    @OverwriteProtectionBody(false)
    async handle(request: AssigneeTaskOverviewApiRequest): Promise<AssigneeTaskOverviewApiResponse> {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        };
        try {
            const query: GetTasksByAssigneeIdQuery = new GetTasksByAssigneeIdQuery({
                taskId: request.assigneeId,
            });
            const result: TaskOverview[] = await this.queryHandler.handle(query);
            return {
                statusCode: 200,
                body: JSON.stringify({ data: result }),
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
            }

            return {
                statusCode: 500,
                body: '{ "error": "Internal Server Error"}',
                headers: headers
            };
        }
    }
}
