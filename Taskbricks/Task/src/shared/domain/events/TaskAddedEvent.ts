import { Event } from "@codebricks/typebricks";

export interface TaskAddedEventProperties {
    id: string;
    aggregateId: string;
    aggregateVersion: number;
    payload: TaskAddedEventPayload;
    occurredAt: Date;
}

export interface TaskAddedEventPayload {
    title: string;
    description: string;
    assigneeId: string;
}

export class TaskAddedEvent extends Event<TaskAddedEventPayload> {
    static readonly eventName: string = 'TaskAdded';

    constructor(properties: TaskAddedEventProperties) {
        super({...properties, name: TaskAddedEvent.eventName});
    }
}
