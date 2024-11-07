import { OverwriteProtectionBody, InboundEventFactory, EventMessage, parseToDateTime, PolicyInboxEntity, ProjectionInboxEntity } from "@codebricks/typebricks";
import { TaskAddedEventMessage, TaskAddedEventMessagePayload } from "shared/application/inboundEvents/TaskAddedEventMessage";
import { TaskCompletedEventMessage, TaskCompletedEventMessagePayload } from "shared/application/inboundEvents/TaskCompletedEventMessage";

export class TaskInboundEventFactory extends InboundEventFactory {
    readonly getInboundEvent = {
        [TaskAddedEventMessage.eventName]: this.getTaskAddedEventMessage,
        [TaskCompletedEventMessage.eventName]: this.getTaskCompletedEventMessage
    };

    @OverwriteProtectionBody(false)
    getTaskAddedEventMessage(inboxEvent: PolicyInboxEntity | ProjectionInboxEntity): TaskAddedEventMessage {
        const deserializedEventMessage: EventMessage = JSON.parse(inboxEvent.message);
        const deserializedPayload: Partial<TaskAddedEventMessagePayload> = JSON.parse(deserializedEventMessage.payload, parseToDateTime);

        return new TaskAddedEventMessage(
            {
                streamName: inboxEvent.streamName,
                no: inboxEvent.no,
                id: inboxEvent.id,
                aggregateId: deserializedEventMessage.aggregateId,
                aggregateVersion: deserializedEventMessage.aggregateVersion,
                payload: {
                    title: deserializedPayload.title!,
                    description: deserializedPayload.description!,
                    assigneeId: deserializedPayload.assigneeId!,
                },
                occurredAt: new Date(deserializedEventMessage.occurredAt)
            }
        );
    }

    @OverwriteProtectionBody(false)
    getTaskCompletedEventMessage(inboxEvent: PolicyInboxEntity | ProjectionInboxEntity): TaskCompletedEventMessage {
        const deserializedEventMessage: EventMessage = JSON.parse(inboxEvent.message);
        const deserializedPayload: Partial<TaskCompletedEventMessagePayload> = JSON.parse(deserializedEventMessage.payload, parseToDateTime);

        return new TaskCompletedEventMessage(
            {
                streamName: inboxEvent.streamName,
                no: inboxEvent.no,
                id: inboxEvent.id,
                aggregateId: deserializedEventMessage.aggregateId,
                aggregateVersion: deserializedEventMessage.aggregateVersion,
                payload: {
                },
                occurredAt: new Date(deserializedEventMessage.occurredAt)
            }
        );
    }
}
