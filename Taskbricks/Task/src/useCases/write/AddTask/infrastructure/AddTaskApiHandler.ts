import { APIGatewayProxyEvent, APIGatewayProxyResult, parseToDateTime } from "@codebricks/typebricks";
import { AddTaskApi } from "./AddTaskApi";
import { AddTaskApiRequest } from "./AddTaskApi";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

/** @overwrite-protection-body false */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        await initDataSource();
        const addTaskApi: AddTaskApi = new AddTaskApi();
        const request: AddTaskApiRequest = JSON.parse(event.body ? event.body : '{}', parseToDateTime) as AddTaskApiRequest;
        return await addTaskApi.handle(request) as unknown as Promise<APIGatewayProxyResult>;
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
