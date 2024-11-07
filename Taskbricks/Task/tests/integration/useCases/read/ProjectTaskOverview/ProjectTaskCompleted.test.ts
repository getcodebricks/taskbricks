import { describe, it, beforeEach, after } from "mocha";
import { expect } from "chai";
import { MockHelper } from "tests/integration/utils/MockHelper";
import { IntegrationTestHelper } from "tests/integration/utils/IntegrationTestHelper";
import { TaskCompletedEventMessage } from "shared/application/inboundEvents/TaskCompletedEventMessage";
import { GivenTaskCompletedEventMessage } from "tests/integration/utils/given/inboundEvents/GivenTaskCompletedEventMessage";
import { defaultTaskOverview, TaskOverview } from "shared/application/readmodels/TaskOverview";
import { GivenTaskOverview } from "tests/integration/utils/given/readmodels/GivenTaskOverview";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";

const taskId: string = '287e9099-0521-4704-993b-84d15f4f2dd6';
const givenTaskOverview: TaskOverview[] = [
    GivenTaskOverview.readModel({
        taskId: taskId,
    }),
];
const projectedEvent: TaskCompletedEventMessage = GivenTaskCompletedEventMessage.inboundEvent({
    streamName: 'Taskbricks.Task',
    no: 1,
    aggregateId: taskId,
});
const expectedTaskOverview: TaskOverview[] = [
    {
        ...givenTaskOverview[0],
        status: TaskStatusEnum.Completed,
    },
];

describe('Projecting TaskCompleted',
    /** @overwrite-protection-body false */
    async function() {
        beforeEach(async function() {
            MockHelper.mockSQSClient();
            await IntegrationTestHelper.resetDB();
        });

        after(function() {
            MockHelper.restore();
        });

        it('updates TaskOverview read model.', async function() {
            await IntegrationTestHelper.givenTaskOverviews(givenTaskOverview);
            await IntegrationTestHelper.whenProjectingTaskOverview(projectedEvent);
            await IntegrationTestHelper.thenExpectTaskOverview(expectedTaskOverview);
        });
    });

