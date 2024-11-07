import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";
import { JsonColumnTransformer } from "@codebricks/typebricks";
import { TaskOverview } from "shared/application/readmodels/TaskOverview";
import { TaskStatusEnum } from "shared/domain/enums/TaskStatusEnum";

@Entity('task_task_overview')
export class TaskOverviewEntity extends BaseEntity {
    @PrimaryColumn({ name: 'task_id', type: 'uuid'})
    taskId: string;
    @Column({ name: 'title', type: 'text'})
    title: string;
    @Column({ name: 'description', type: 'text'})
    description: string;
    @Column({ name: 'assignee_id', type: 'uuid'})
    assigneeId: string;
    @Column({ name: 'status', type: 'text'})
    status: TaskStatusEnum;

    constructor(props?: TaskOverview) {
        super();
        if (props){
            this.taskId = props.taskId;
            this.title = props.title;
            this.description = props.description;
            this.assigneeId = props.assigneeId;
            this.status = props.status;
        }
    }
}
