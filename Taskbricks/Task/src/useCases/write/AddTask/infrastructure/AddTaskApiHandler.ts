import { APIGatewayProxyEvent, APIGatewayProxyResult, ApiResponse, authorizedUserIdFromAPIGatewayEvent, requestFromAPIGatewayEvent, errorToAPIGatewayResult, responseToAPIGateWayResult } from "@codebricks/typebricks";
import { AddTaskApi, AddTaskApiRequest, AddTaskApiResponseBody } from "./AddTaskApi";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

/** @overwrite-protection-body false */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        await initDataSource();
        const addTaskApi: AddTaskApi = new AddTaskApi();
        const request: AddTaskApiRequest = requestFromAPIGatewayEvent(event);
        const response: ApiResponse<AddTaskApiResponseBody> = await addTaskApi.handle(request);
        return responseToAPIGateWayResult(response);
    } catch (error: any) {
        console.log(error);
        return errorToAPIGatewayResult(error);
    } finally {
        await destroyDataSource();
    }
}
