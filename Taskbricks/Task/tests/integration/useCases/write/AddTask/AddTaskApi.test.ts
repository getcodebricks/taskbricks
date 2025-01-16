import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { APIGatewayProxyResult, Event, parseToDateTime } from "@codebricks/typebricks";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper, TExpectedEvent } from "tests/integration/utils/IntegrationTestHelper";
import { AddTaskApiRequest, AddTaskApiResponseBody } from "useCases/write/AddTask/infrastructure/AddTaskApi";
import { handler } from "useCases/write/AddTask/infrastructure/AddTaskApiHandler";
import { ExpectedTaskAddedEvent } from "tests/integration/utils/expected/events/ExpectedTaskAddedEvent";

const aggregateId: string = '92f30001-23c2-49d5-94c5-2d62139816a2';
const now: Date = new Date();
const title: string = 'Send Moving Reminder Email';
const description: string = 'Send a reminder email to all users to notify them about our move.';
const assigneeId: string = 'ffda9065-9a59-4d7a-952f-0f4c4acf002e';
const request: AddTaskApiRequest = {
    title: title,
    description: description,
    assigneeId: assigneeId,
};
const expectedResponse: AddTaskApiResponseBody = {
    taskId: aggregateId,
};
const expectedEvents: TExpectedEvent[] = [
    ExpectedTaskAddedEvent.event({
        assigneeId: assigneeId,
        description: description,
        title: title,
    }),
];

describe('POST add-task',
    /** @overwrite-protection-body false */
    async function() {
        before(async function() {
            MockHelper.mockSQSClient();
            MockHelper.stubUuidGenerator(aggregateId);
            MockHelper.stubClock(now);
            await IntegrationTestHelper.resetDB();
        });

        after(function() {
            MockHelper.restore();
        });

        it('produces TaskAddedEvent', async function() {
            const result: APIGatewayProxyResult = await handler(
                IntegrationTestHelper.toApiGatewayEvent(request)
            );
            expect(result.statusCode).equal(200);
            expect(JSON.parse(result.body, parseToDateTime)?.data).to.deep.equal(expectedResponse);
            await IntegrationTestHelper.expectEventsOnStream(expectedEvents);
        });
    });

