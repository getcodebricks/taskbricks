import { Entity } from "typeorm";
import { AbstractAggregateStateEntity, Clock } from "@codebricks/typebricks";

@Entity('task_state')
export class TaskStateEntity extends AbstractAggregateStateEntity {
}
