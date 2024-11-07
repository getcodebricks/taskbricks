import { InboundEvent, Event, OverwriteProtectionBody, APIGatewayProxyEvent, SQSEvent, SQSRecord, EventStreamEntity, parseToDateTime } from "@codebricks/typebricks";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";
import { TaskRepository } from "shared/infrastructure/persistence/aggregate/TaskRepository";
import { TestAppDataSource } from "./TestAppDataSource";
import { expect } from "chai";
import { BaseEntity } from "typeorm";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskOverviewEntity } from "shared/infrastructure/persistence/readmodel/TaskOverviewEntity";
import { handler as taskOverviewHandler } from "useCases/read/TaskOverviewProjection/infrastructure/TaskOverviewProjectionHandler";

export type TExpectedEvent = {
        name: string;
        payload: Record<string, any>;
    };

export class IntegrationTestHelper {
    @OverwriteProtectionBody(false)
    static async resetDB(): Promise<void> {
        if (!TestAppDataSource.isInitialized) {
            await TestAppDataSource.initialize();
        }
        for (const entity of TestAppDataSource.entityMetadatas) {
            await TestAppDataSource.getRepository(entity.name).clear();
        }
    }

    @OverwriteProtectionBody(false)
    static async givenTaskAggregate(events: Event<any>[]): Promise<void> {
        if (events.length < 1) {
            return;
        }
        const eventEntities: TaskEventStreamEntity[] = events.map((event: Event<any>) => new TaskEventStreamEntity(event));
        await TestAppDataSource.manager.save(eventEntities);
    }

    @OverwriteProtectionBody(false)
    static toApiGatewayEvent(request: Record<string, any>, autorizedUserId?: string): APIGatewayProxyEvent {
        return {
            body: JSON.stringify(request),
            requestContext: {
                authorizer: {
                    principalId: autorizedUserId
                }
            } as any
        } as APIGatewayProxyEvent;
    }

    @OverwriteProtectionBody(false)
    static toQueryApiGatewayEvent(queryParameters: Record<string, any>, autorizedUserId?: string): APIGatewayProxyEvent {
        const [queryStrings, multiValueQueryStrings] = IntegrationTestHelper.splitQueryStrings(queryParameters);
        return {
            queryStringParameters: queryStrings,
            multiValueQueryStringParameters: multiValueQueryStrings,
            requestContext: {
                authorizer: {
                    principalId: autorizedUserId
                }
            } as any
        } as APIGatewayProxyEvent;
    }

    static splitQueryStrings(queryParameters: Record<string, any>): [Record<string, any>, Record<string, any>] {
        const queryStrings: Record<string, any[]> = {};
        const multiValueQueryStrings: Record<string, any[]> = {};
        Object.entries(queryParameters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                multiValueQueryStrings[key] = value;
                queryStrings[key] = value[0];
            } else {
                multiValueQueryStrings[key] = [value];
                queryStrings[key] = value;
            }
        });

        return [queryStrings, multiValueQueryStrings];
    }

    @OverwriteProtectionBody(false)
    static async expectEventsOnStream(expectedEvents: TExpectedEvent[], givenEvents?: Event<any>[]): Promise<void> {
        const actualEvents: TaskEventStreamEntity[] = await TestAppDataSource.manager.find(TaskEventStreamEntity, {skip: givenEvents?.length});
        expect(actualEvents.length).equal(expectedEvents.length);
        actualEvents.forEach((actualEvent: TaskEventStreamEntity, key: number) => {
            expect(actualEvent.name).equal(expectedEvents[key].name);
            expect(JSON.parse(actualEvent.payload, parseToDateTime)).to.deep.equal(expectedEvents[key].payload);
        });
    }

    @OverwriteProtectionBody(false)
    static async givenTaskOverviews(readModels: TaskOverview[]): Promise<void> {
        for (const readModel of readModels) {
            await TestAppDataSource.manager.save(new TaskOverviewEntity(readModel));
        }
    }

    @OverwriteProtectionBody(false)
    static async whenProjectingTaskOverview(...projectedEvents: InboundEvent<any>[]): Promise<void> {
        for (const projectedEvent of projectedEvents) {
            const sqsEvent: SQSEvent = {
                Records: [{
                    body: JSON.stringify({
                        ...projectedEvent,
                        payload: JSON.stringify(projectedEvent.payload)
                    })
                } as SQSRecord]
            }
            await taskOverviewHandler(sqsEvent);
        }
    }

    @OverwriteProtectionBody(false)
    static async thenExpectTaskOverview(expectedTaskOverview: TaskOverview[]): Promise<void> {
        const actualTaskOverview = await TestAppDataSource.manager.find(TaskOverviewEntity);
        expect(actualTaskOverview).to.deep.equal(expectedTaskOverview);
    }
}
