import { APIGatewayProxyEvent, APIGatewayProxyResult, parseToDateTime } from "@codebricks/typebricks";
import { CompleteTaskApi } from "./CompleteTaskApi";
import { CompleteTaskApiRequest } from "./CompleteTaskApi";
import { initDataSource, destroyDataSource } from "shared/infrastructure/persistence/AppDataSource";

/** @overwrite-protection-body false */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        await initDataSource();
        const completeTaskApi: CompleteTaskApi = new CompleteTaskApi();
        const request: CompleteTaskApiRequest = JSON.parse(event.body ? event.body : '{}', parseToDateTime) as CompleteTaskApiRequest;
        return await completeTaskApi.handle(request) as unknown as Promise<APIGatewayProxyResult>;
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
