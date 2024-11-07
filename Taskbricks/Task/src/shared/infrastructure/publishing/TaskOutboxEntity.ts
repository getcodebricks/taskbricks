import { Entity } from "typeorm";
import { OutboxEntity } from "@codebricks/typebricks";

@Entity('task_outbox')
export class TaskOutboxEntity extends OutboxEntity {
}
