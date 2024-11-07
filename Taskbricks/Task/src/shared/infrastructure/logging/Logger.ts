import { OverwriteProtectionBody } from "@codebricks/typebricks";

export class Logger {
    static readonly instance: Logger = new Logger();
    logEvent: any = {};

    @OverwriteProtectionBody(false)
    static reset(): void {
        this.instance.logEvent = {};
    }

    @OverwriteProtectionBody(false)
    spreadIntoLogEvent(partialLogEvent: any): void {
        this.logEvent = {
            ...this.logEvent,
            ...partialLogEvent
        };
    }
}
