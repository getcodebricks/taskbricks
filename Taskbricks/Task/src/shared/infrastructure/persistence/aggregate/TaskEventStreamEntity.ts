import { Entity } from "typeorm";
import { EventStreamEntity } from "@codebricks/typebricks";

@Entity('task_event_stream')
export class TaskEventStreamEntity extends EventStreamEntity {
}
