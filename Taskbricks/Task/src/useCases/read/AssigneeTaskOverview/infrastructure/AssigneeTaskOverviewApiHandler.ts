import { APIGatewayProxyEvent, APIGatewayProxyResult, ApiResponse, authorizedUserIdFromAPIGatewayEvent, errorToAPIGatewayResult, responseToAPIGateWayResult } from "@codebricks/typebricks";
import { AssigneeTaskOverviewApi, AssigneeTaskOverviewApiRequest } from "./AssigneeTaskOverviewApi";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        await initDataSource();
        const assigneeTaskOverviewApi: AssigneeTaskOverviewApi = new AssigneeTaskOverviewApi();
        const request: AssigneeTaskOverviewApiRequest = {
            assigneeId: event.queryStringParameters?.assigneeId as string,
        };
        const response: ApiResponse<TaskOverview[]> = await assigneeTaskOverviewApi.handle(request);
        return responseToAPIGateWayResult(response);
    } catch (error: any) {
        console.log(error);
        return errorToAPIGatewayResult(error);
    } finally {
        await destroyDataSource();
    }
}
