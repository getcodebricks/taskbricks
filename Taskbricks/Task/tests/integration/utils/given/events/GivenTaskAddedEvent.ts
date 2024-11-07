import { TaskAddedEvent } from "shared/domain/events/TaskAddedEvent";
import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { faker } from "@faker-js/faker";

export interface GivenTaskAddedEventProperties {
    id?: string;
    aggregateId: string;
    aggregateVersion: number;
    payload?: GivenTaskAddedEventPayload;
    occurredAt?: Date;
}

export interface GivenTaskAddedEventPayload {
    title?: string;
    description?: string;
    assigneeId?: string;
}

export class GivenTaskAddedEvent {
    @OverwriteProtectionBody(false)
    static event(properties: GivenTaskAddedEventProperties): TaskAddedEvent {
        return new TaskAddedEvent({
            id: properties.id ?? faker.string.uuid(),
            aggregateId: properties.aggregateId,
            aggregateVersion: properties.aggregateVersion,
            payload: {
                title: properties.payload?.title ?? faker.string.alpha(),
                description: properties.payload?.description ?? faker.string.alpha(),
                assigneeId: properties.payload?.assigneeId ?? faker.string.uuid(),
            },
            occurredAt: properties.occurredAt ?? new Date(),
        });
    }
}
