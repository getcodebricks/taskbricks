import { OverwriteProtectionBody, NotFoundError, PreconditionFailedError, UuidGenerator } from "@codebricks/typebricks";
import { TaskAggregate } from "shared/domain/aggregate/TaskAggregate";
import { CompleteTaskCommand } from "./CompleteTaskCommand";
import { TaskRepository } from "shared/infrastructure/persistence/aggregate/TaskRepository";
import { TaskPublisherTrigger } from "shared/infrastructure/publishing/TaskPublisherTrigger";

export class CompleteTaskCommandHandler {
    constructor(readonly repository: TaskRepository = new TaskRepository(), readonly publisher: TaskPublisherTrigger = new TaskPublisherTrigger()) {
    }

    @OverwriteProtectionBody(false)
    async handleCompleteTask(command: CompleteTaskCommand): Promise<TaskAggregate> {
        const aggregate: TaskAggregate | null = await this.repository.get(command.payload.taskId.value);
        if (!aggregate) {
            throw new NotFoundError('TaskAggregate not found.');
        }
        await aggregate.completeTask({
        });
        await this.repository.save(aggregate);
        await this.publisher.trigger();

        return aggregate;
    }
}
