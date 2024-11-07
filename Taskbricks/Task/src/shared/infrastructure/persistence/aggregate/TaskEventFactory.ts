import { OverwriteProtectionBody, EventFactory, parseToDateTime } from "@codebricks/typebricks";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { TaskAddedEvent, TaskAddedEventPayload } from "shared/domain/events/TaskAddedEvent";
import { TaskCompletedEvent, TaskCompletedEventPayload } from "shared/domain/events/TaskCompletedEvent";

export class TaskEventFactory extends EventFactory {
    readonly getEvent = {
        [TaskAddedEvent.eventName]: this.getTaskAddedEvent,
        [TaskCompletedEvent.eventName]: this.getTaskCompletedEvent
    };

    @OverwriteProtectionBody(false)
    getTaskAddedEvent(storedEvent: TaskEventStreamEntity): TaskAddedEvent {
        const deserializedPayload: Partial<TaskAddedEventPayload> = JSON.parse(storedEvent.payload, parseToDateTime);
        return new TaskAddedEvent(
            {
                id: storedEvent.id,
                aggregateId: storedEvent.aggregateId,
                aggregateVersion: storedEvent.aggregateVersion,
                payload: {
                    title: deserializedPayload.title!,
                    description: deserializedPayload.description!,
                    assigneeId: deserializedPayload.assigneeId!,
                },
                occurredAt: new Date(storedEvent.occurredAt)
            }
        );
    }

    @OverwriteProtectionBody(false)
    getTaskCompletedEvent(storedEvent: TaskEventStreamEntity): TaskCompletedEvent {
        const deserializedPayload: Partial<TaskCompletedEventPayload> = JSON.parse(storedEvent.payload, parseToDateTime);
        return new TaskCompletedEvent(
            {
                id: storedEvent.id,
                aggregateId: storedEvent.aggregateId,
                aggregateVersion: storedEvent.aggregateVersion,
                payload: {
                },
                occurredAt: new Date(storedEvent.occurredAt)
            }
        );
    }
}
