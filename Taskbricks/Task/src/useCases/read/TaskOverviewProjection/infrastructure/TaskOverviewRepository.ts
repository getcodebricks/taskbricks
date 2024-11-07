import { ProjectionRepository, IProjectionRepositoryMethods } from "@codebricks/typebricks";
import { FindOneOptions, FindManyOptions } from "typeorm";
import { TaskOverviewEntity } from "shared/infrastructure/persistence/readmodel/TaskOverviewEntity";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskProjectionPositionEntity } from "shared/infrastructure/consuming/TaskProjectionPositionEntity";
import { TaskProjectionInboxEntity } from "shared/infrastructure/consuming/TaskProjectionInboxEntity";
import { TaskInboundEventFactory } from "shared/infrastructure/consuming/TaskInboundEventFactory";
import { AppDataSource } from "shared/infrastructure/persistence/AppDataSource";

export interface TaskOverviewRepositoryMethods extends IProjectionRepositoryMethods {
    getOne: (findOneOptions: FindOneOptions<TaskOverviewEntity>) => Promise<TaskOverview | null>;
    getMany: (findManyOptions: FindManyOptions<TaskOverviewEntity>) => Promise<TaskOverview[]>;
    updateOne: (projectedEntity: TaskOverview) => Promise<TaskOverview | null>;
    updateMany: (projectedEntities: TaskOverview[]) => Promise<TaskOverview[]>;
    delete: (findManyOptions: FindManyOptions) => Promise<number | null | undefined>;
}

export class TaskOverviewRepository extends ProjectionRepository<TaskProjectionInboxEntity, TaskProjectionPositionEntity, TaskOverviewEntity, TaskOverviewRepositoryMethods> {
    constructor() {
        super(AppDataSource, TaskProjectionInboxEntity, TaskProjectionPositionEntity, TaskOverviewEntity, new TaskInboundEventFactory());
    }
}
