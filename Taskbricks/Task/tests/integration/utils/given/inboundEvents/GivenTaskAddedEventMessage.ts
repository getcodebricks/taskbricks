import { TaskAddedEventMessage } from "shared/application/inboundEvents/TaskAddedEventMessage";
import { OverwriteProtectionBody } from "@codebricks/typebricks";
import { faker } from "@faker-js/faker";

export interface GivenTaskAddedEventMessageProperties {
    streamName: string;
    no: number;
    id?: string;
    aggregateId?: string;
    aggregateVersion?: number;
    payload?: GivenTaskAddedEventMessagePayload;
    occurredAt?: Date;
}

export interface GivenTaskAddedEventMessagePayload {
    title?: string;
    description?: string;
    assigneeId?: string;
}

export class GivenTaskAddedEventMessage {
    @OverwriteProtectionBody(false)
    static inboundEvent(properties: GivenTaskAddedEventMessageProperties): TaskAddedEventMessage {
        return new TaskAddedEventMessage({
            streamName: properties.streamName,
            no: properties.no,
            id: properties.id ?? faker.string.uuid(),
            aggregateId: properties.aggregateId ?? faker.string.uuid(),
            aggregateVersion: properties.aggregateVersion ?? faker.number.int(1024),
            payload: {
                title: properties.payload?.title ?? faker.string.alpha(),
                description: properties.payload?.description ?? faker.string.alpha(),
                assigneeId: properties.payload?.assigneeId ?? faker.string.uuid(),
            },
            occurredAt: properties.occurredAt ?? faker.date.anytime(),
        });
    }
}
