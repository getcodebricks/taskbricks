import { Projector, ProjectMethods, OverwriteProtectionBody } from "@codebricks/typebricks";
import { defaultTaskOverview, TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskOverviewRepository, TaskOverviewRepositoryMethods } from "../infrastructure/TaskOverviewRepository";
import { TaskAddedEventMessage } from "shared/application/inboundEvents/TaskAddedEventMessage";
import { TaskCompletedEventMessage } from "shared/application/inboundEvents/TaskCompletedEventMessage";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";

export class TaskOverviewProjector extends Projector {
    readonly projectionName: string = 'TaskOverview';
    readonly projectMethods: ProjectMethods = {
        'Taskbricks.Task.TaskAdded': this.projectTaskbricksTaskTaskAdded.bind(this),
        'Taskbricks.Task.TaskCompleted': this.projectTaskbricksTaskTaskCompleted.bind(this)
    };
    readonly streamNames: string[] = ['Taskbricks.Task'];

    constructor(readonly repository: TaskOverviewRepository = new TaskOverviewRepository()) {
        super(repository);
    }

    @OverwriteProtectionBody(false)
    async projectTaskbricksTaskTaskAdded(eventMessage: TaskAddedEventMessage, methods: TaskOverviewRepositoryMethods): Promise<void> {
        const existingProjectedEntity: TaskOverview | null = await methods.getOne({
            where: {
                taskId: eventMessage.aggregateId,
            }
        });
        const projectedEntity: TaskOverview = this.applyTaskbricksTaskTaskAdded(existingProjectedEntity, eventMessage);
        await methods.updateOne(projectedEntity);
    }

    @OverwriteProtectionBody(false)
    async projectTaskbricksTaskTaskCompleted(eventMessage: TaskCompletedEventMessage, methods: TaskOverviewRepositoryMethods): Promise<void> {
        const existingProjectedEntity: TaskOverview | null = await methods.getOne({
            where: {
                taskId: eventMessage.aggregateId,
            }
        });
        const projectedEntity: TaskOverview = this.applyTaskbricksTaskTaskCompleted(existingProjectedEntity, eventMessage);
        await methods.updateOne(projectedEntity);
    }

    @OverwriteProtectionBody(false)
    applyTaskbricksTaskTaskAdded(existingProjectedEntity: TaskOverview | null, eventMessage: TaskAddedEventMessage): TaskOverview {
        const newProjectedEntity = existingProjectedEntity ?? defaultTaskOverview;
        newProjectedEntity.taskId = eventMessage.aggregateId;
        newProjectedEntity.title = eventMessage.payload.title;
        newProjectedEntity.description = eventMessage.payload.description;
        newProjectedEntity.assigneeId = eventMessage.payload.assigneeId;
        newProjectedEntity.status = TaskStatusEnum.Open;

        return newProjectedEntity;
    }

    @OverwriteProtectionBody(false)
    applyTaskbricksTaskTaskCompleted(existingProjectedEntity: TaskOverview | null, eventMessage: TaskCompletedEventMessage): TaskOverview {
        const newProjectedEntity = existingProjectedEntity ?? defaultTaskOverview;
        newProjectedEntity.status = TaskStatusEnum.Completed;

        return newProjectedEntity;
    }
}
