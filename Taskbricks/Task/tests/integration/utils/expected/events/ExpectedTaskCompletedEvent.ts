import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { TExpectedEvent } from "tests/integration/utils/IntegrationTestHelper";
import { TaskCompletedEvent, TaskCompletedEventPayload } from "shared/domain/events/TaskCompletedEvent";

export class ExpectedTaskCompletedEvent {
    @OverwriteProtectionBody(false)
    static event(payload: TaskCompletedEventPayload): TExpectedEvent {
        return {
            name: TaskCompletedEvent.eventName,
            payload: payload
        };
    }
}
