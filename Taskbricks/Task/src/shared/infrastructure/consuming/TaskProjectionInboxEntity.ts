import { Entity } from "typeorm";
import { ProjectionInboxEntity } from "@codebricks/typebricks";

@Entity('task_projection_inbox')
export class TaskProjectionInboxEntity extends ProjectionInboxEntity {
}
