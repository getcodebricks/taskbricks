import { AbstractAggregateRepository } from "@codebricks/typebricks";
import { QueryRunner } from "shared/infrastructure/persistence/AppDataSource";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";
import { TaskEventStreamEntity } from "shared/infrastructure/persistence/aggregate/TaskEventStreamEntity";
import { TaskOutboxEntity } from "shared/infrastructure/publishing/TaskOutboxEntity";
import { TaskStateEntity } from "shared/infrastructure/persistence/aggregate/TaskStateEntity";
import { TaskEventFactory } from "shared/infrastructure/persistence/aggregate/TaskEventFactory";

export class TaskRepository extends AbstractAggregateRepository<TaskAggregate, TaskEventStreamEntity, TaskOutboxEntity, TaskStateEntity, TaskEventFactory> {
    static readonly streamName: string = `Taskbricks.${TaskAggregate.aggregateName}`;

    constructor() {
        super(QueryRunner, TaskAggregate, TaskEventStreamEntity, TaskOutboxEntity, TaskStateEntity, TaskEventFactory, TaskRepository.streamName);
    }
}
