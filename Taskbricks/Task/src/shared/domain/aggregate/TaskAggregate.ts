import { Aggregate, Event, OverwriteProtectionBody, UuidGenerator, Clock, ConflictError, PreconditionFailedError, ValidationError } from "@codebricks/typebricks";
import { TaskAggregateState, defaultState } from "./TaskAggregateState";
import { AddTaskProperties, CompleteTaskProperties } from "./taskMethodsProperties";
import { TaskAddedEvent } from "shared/domain/events/TaskAddedEvent";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";
import { TaskCompletedEvent } from "shared/domain/events/TaskCompletedEvent";

export class TaskAggregate extends Aggregate<TaskAggregateState> {
    static readonly aggregateName: string = 'Task';
    readonly applyMethods = {
        [TaskAddedEvent.name]: this.applyTaskAddedEvent.bind(this),
        [TaskCompletedEvent.name]: this.applyTaskCompletedEvent.bind(this)
    };

    constructor(id: string) {
        super(id, 0, defaultState);
    }

    @OverwriteProtectionBody(false)
    apply(event: Event<any>): TaskAggregateState {
        return this.applyMethods[event.constructor.name](event);
    }

    @OverwriteProtectionBody(false)
    async addTask(properties: AddTaskProperties): Promise<void> {
        const taskAddedEvent = new TaskAddedEvent(
            {
                id: UuidGenerator.uuid(),
                aggregateId: this.id,
                aggregateVersion: this.version + 1,
                payload: {
                    title: properties.title.value,
                    description: properties.description.value,
                    assigneeId: properties.assigneeId.value,
                },
                occurredAt: Clock.now()
            }
        );
        this.addEvent(taskAddedEvent);
    }

    @OverwriteProtectionBody(false)
    applyTaskAddedEvent(event: TaskAddedEvent): TaskAggregateState {
        const newAggregateState: TaskAggregateState = { ...this.state };

        newAggregateState.status = TaskStatusEnum.Open;

        return newAggregateState;
    }

    @OverwriteProtectionBody(false)
    async completeTask(properties: CompleteTaskProperties): Promise<void> {
        const taskCompletedEvent = new TaskCompletedEvent(
            {
                id: UuidGenerator.uuid(),
                aggregateId: this.id,
                aggregateVersion: this.version + 1,
                payload: {
                },
                occurredAt: Clock.now()
            }
        );
        this.addEvent(taskCompletedEvent);
    }

    @OverwriteProtectionBody(false)
    applyTaskCompletedEvent(event: TaskCompletedEvent): TaskAggregateState {
        const newAggregateState: TaskAggregateState = { ...this.state };

        newAggregateState.status = TaskStatusEnum.Completed;

        return newAggregateState;
    }
}
