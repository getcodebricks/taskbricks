import { TaskCompletedEventMessage } from "shared/application/inboundEvents/TaskCompletedEventMessage";
import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { faker } from "@faker-js/faker";

export interface GivenTaskCompletedEventMessageProperties {
    streamName: string;
    no: number;
    id?: string;
    aggregateId?: string;
    aggregateVersion?: number;
    payload?: GivenTaskCompletedEventMessagePayload;
    occurredAt?: Date;
}

export interface GivenTaskCompletedEventMessagePayload {
}

export class GivenTaskCompletedEventMessage {
    @OverwriteProtectionBody(false)
    static inboundEvent(properties: GivenTaskCompletedEventMessageProperties): TaskCompletedEventMessage {
        return new TaskCompletedEventMessage({
            streamName: properties.streamName,
            no: properties.no,
            id: properties.id ?? faker.string.uuid(),
            aggregateId: properties.aggregateId ?? faker.string.uuid(),
            aggregateVersion: properties.aggregateVersion ?? faker.number.int(1024),
            payload: {
            },
            occurredAt: properties.occurredAt ?? faker.date.anytime(),
        });
    }
}
