import { Entity } from "typeorm";
import { ProjectionPositionEntity } from "@codebricks/typebricks";

@Entity('task_projection_position')
export class TaskProjectionPositionEntity extends ProjectionPositionEntity {
}
