import { APIGatewayProxyEvent, APIGatewayProxyResult } from "@codebricks/typebricks";
import { AssigneeTaskOverviewApi } from "./AssigneeTaskOverviewApi";
import { AssigneeTaskOverviewApiRequest } from "./AssigneeTaskOverviewApi";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        await initDataSource();
        const assigneeTaskOverviewApi: AssigneeTaskOverviewApi = new AssigneeTaskOverviewApi();
        const request: AssigneeTaskOverviewApiRequest = {
            assigneeId: event.queryStringParameters?.assigneeId as string,
        };
        return await assigneeTaskOverviewApi.handle(request) as unknown as Promise<APIGatewayProxyResult>;
    } catch (error: any) {
        console.log(error);
        if (error instanceof SyntaxError && error.message.match(/Unexpected.token.*JSON.*/i)) {
            return Promise.resolve({
                statusCode: 400,
                body: '{ "error": "bad request: invalid json"}',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            }) as Promise<APIGatewayProxyResult>;
        } else {
            return Promise.resolve({
                statusCode: 500,
                body: '{ "error": "Internal Server Error"}',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            }) as Promise<APIGatewayProxyResult>;
        }
    } finally {
        await destroyDataSource();
    }
}
