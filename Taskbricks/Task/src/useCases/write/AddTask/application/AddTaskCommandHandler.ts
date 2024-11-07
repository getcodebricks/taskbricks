import { OverwriteProtectionBody, NotFoundError, PreconditionFailedError, UuidGenerator } from "@codebricks/typebricks";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";
import { AddTaskCommand } from "./AddTaskCommand";
import { TaskRepository } from "shared/infrastructure/persistence/aggregate/TaskRepository";
import { TaskPublisherTrigger } from "shared/infrastructure/publishing/TaskPublisherTrigger";

export class AddTaskCommandHandler {
    constructor(readonly repository: TaskRepository = new TaskRepository(), readonly publisher: TaskPublisherTrigger = new TaskPublisherTrigger()) {
    }

    @OverwriteProtectionBody(false)
    async handleAddTask(command: AddTaskCommand): Promise<TaskAggregate> {
        const aggregate: TaskAggregate = new TaskAggregate(UuidGenerator.uuid());
        await aggregate.addTask({
            title: command.payload.title,
            description: command.payload.description,
            assigneeId: command.payload.assigneeId,
        });
        await this.repository.save(aggregate);
        await this.publisher.trigger();

        return aggregate;
    }
}
