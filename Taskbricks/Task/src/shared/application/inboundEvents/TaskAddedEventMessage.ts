import { InboundEvent } from "@codebricks/typebricks";

export interface TaskAddedEventMessageProperties {
    streamName: string;
    no: number;
    id: string;
    aggregateId: string;
    aggregateVersion: number;
    payload: TaskAddedEventMessagePayload;
    occurredAt: Date;
}

export interface TaskAddedEventMessagePayload {
    title: string;
    description: string;
    assigneeId: string;
}

export class TaskAddedEventMessage extends InboundEvent<TaskAddedEventMessagePayload> {
    static readonly eventName: string = 'TaskAdded';

    constructor(properties: TaskAddedEventMessageProperties) {
        super({...properties, name: TaskAddedEventMessage.eventName});
    }
}
