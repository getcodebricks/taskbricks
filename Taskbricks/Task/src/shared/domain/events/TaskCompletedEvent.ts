import { Event } from "@codebricks/typebricks";

export interface TaskCompletedEventProperties {
    id: string;
    aggregateId: string;
    aggregateVersion: number;
    payload: TaskCompletedEventPayload;
    occurredAt: Date;
}

export interface TaskCompletedEventPayload {
}

export class TaskCompletedEvent extends Event<TaskCompletedEventPayload> {
    static readonly eventName: string = 'TaskCompleted';

    constructor(properties: TaskCompletedEventProperties) {
        super({...properties, name: TaskCompletedEvent.eventName});
    }
}
