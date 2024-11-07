import { PublisherTrigger } from "@codebricks/typebricks";

export class TaskPublisherTrigger extends PublisherTrigger {
    constructor() {
        super(String(process.env.PUBLISHER_QUEUE));
    }
}
