import { describe, it, before, after } from "mocha";
import { expect } from "chai";
import { APIGatewayProxyResult, parseToDateTime } from "@codebricks/typebricks";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper } from "tests/integration/utils/IntegrationTestHelper";
import { AssigneeTaskOverviewApiRequest } from "useCases/read/AssigneeTaskOverview/infrastructure/AssigneeTaskOverviewApi";
import { handler } from "useCases/read/AssigneeTaskOverview/infrastructure/AssigneeTaskOverviewApiHandler";
import { defaultTaskOverview, TaskOverview } from "shared/application/readmodels/TaskOverview";
import { GivenTaskOverview } from "tests/integration/utils/given/readmodels/GivenTaskOverview";

const assigneeId: string = '32a78d0d-e874-4f6d-8940-d8049ba54940';
const givenTaskOverview: TaskOverview[] = [
    GivenTaskOverview.readModel({
        assigneeId: assigneeId,
    }),
    GivenTaskOverview.readModel({
        assigneeId: assigneeId
    }),
    GivenTaskOverview.readModel({}),
];
const request: AssigneeTaskOverviewApiRequest = {
    assigneeId: assigneeId,
};
const expectedResponse: TaskOverview[] = [
    givenTaskOverview[0],
    givenTaskOverview[1],
];

describe('GET assignee-task-overview',
    /** @overwrite-protection-body false */
    async function() {
        before(async function() {
            await IntegrationTestHelper.resetDB();
            await IntegrationTestHelper.givenTaskOverviews(givenTaskOverview);
        });

        after(function() {
            MockHelper.restore();
        });

        it('returns response', async function() {
            const result: APIGatewayProxyResult = await handler(
                IntegrationTestHelper.toQueryApiGatewayEvent(request)
            );
            expect(result.statusCode).equal(200);
            expect(JSON.parse(result.body, parseToDateTime)?.data).to.deep.equal(expectedResponse);
        });
    });

