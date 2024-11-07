import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { TExpectedEvent } from "tests/integration/utils/IntegrationTestHelper";
import { TaskAddedEvent, TaskAddedEventPayload } from "shared/domain/events/TaskAddedEvent";

export class ExpectedTaskAddedEvent {
    @OverwriteProtectionBody(false)
    static event(payload: TaskAddedEventPayload): TExpectedEvent {
        return {
            name: TaskAddedEvent.eventName,
            payload: payload
        };
    }
}
