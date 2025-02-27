import { APIGatewayProxyEvent, APIGatewayProxyResult, ApiResponse, authorizedUserIdFromAPIGatewayEvent, requestFromAPIGatewayEvent, errorToAPIGatewayResult, responseToAPIGateWayResult } from "@codebricks/typebricks";
import { CompleteTaskApi, CompleteTaskApiRequest, CompleteTaskApiResponseBody } from "./CompleteTaskApi";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

/** @overwrite-protection-body false */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        await initDataSource();
        const completeTaskApi: CompleteTaskApi = new CompleteTaskApi();
        const request: CompleteTaskApiRequest = requestFromAPIGatewayEvent(event);
        const response: ApiResponse<CompleteTaskApiResponseBody> = await completeTaskApi.handle(request);
        return responseToAPIGateWayResult(response);
    } catch (error: any) {
        console.log(error);
        return errorToAPIGatewayResult(error);
    } finally {
        await destroyDataSource();
    }
}
