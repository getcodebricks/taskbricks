import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { mockClient } from "aws-sdk-client-mock";
import { OverwriteProtectionBody, UuidGenerator, Clock } from "@codebricks/typebricks";
import * as sinon from "sinon";

export class MockHelper {
    @OverwriteProtectionBody(false)
    static mockSQSClient(): void {
        const sqsMock = mockClient(SQSClient);
        sqsMock.reset();
        sqsMock.on(SendMessageCommand).resolves({
            MessageId: '12345678-1111-2222-3333-111122223333'
        });
    }

    @OverwriteProtectionBody(false)
    static stubUuidGenerator(...uuids: string[]): void {
        var callCount = 0;
        sinon.stub(UuidGenerator, 'uuid').callsFake((): string =>{
            const index = callCount < uuids.length ? callCount : uuids.length - 1;
            callCount++;
            return uuids[index];
        });
    }

    @OverwriteProtectionBody(false)
    static stubClock(...nowValues: Date[]): void {
        var callCount = 0;
        sinon.stub(Clock, 'now').callsFake((): Date =>{
            const index = callCount < nowValues.length ? callCount : nowValues.length - 1;
            callCount++;
            return nowValues[index];
        });
    }

    @OverwriteProtectionBody(false)
    static restore(): void {
        sinon.restore();
    }
}
