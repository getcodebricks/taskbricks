import { InboundEvent } from "@codebricks/typebricks";

export interface TaskCompletedEventMessageProperties {
    streamName: string;
    no: number;
    id: string;
    aggregateId: string;
    aggregateVersion: number;
    payload: TaskCompletedEventMessagePayload;
    occurredAt: Date;
}

export interface TaskCompletedEventMessagePayload {
}

export class TaskCompletedEventMessage extends InboundEvent<TaskCompletedEventMessagePayload> {
    static readonly eventName: string = 'TaskCompleted';

    constructor(properties: TaskCompletedEventMessageProperties) {
        super({...properties, name: TaskCompletedEventMessage.eventName});
    }
}
