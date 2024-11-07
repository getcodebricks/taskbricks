import { TaskCompletedEvent } from "shared/domain/events/TaskCompletedEvent";
import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { faker } from "@faker-js/faker";

export interface GivenTaskCompletedEventProperties {
    id?: string;
    aggregateId: string;
    aggregateVersion: number;
    payload?: GivenTaskCompletedEventPayload;
    occurredAt?: Date;
}

export interface GivenTaskCompletedEventPayload {
}

export class GivenTaskCompletedEvent {
    @OverwriteProtectionBody(false)
    static event(properties: GivenTaskCompletedEventProperties): TaskCompletedEvent {
        return new TaskCompletedEvent({
            id: properties.id ?? faker.string.uuid(),
            aggregateId: properties.aggregateId,
            aggregateVersion: properties.aggregateVersion,
            payload: {
            },
            occurredAt: properties.occurredAt ?? new Date(),
        });
    }
}
