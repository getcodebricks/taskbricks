import { ValueObject, ValidationError, OverwriteProtectionBody, shallowEqualObject } from "@codebricks/typebricks";
import { validate } from "uuid";
import { isType } from "is-what";

export class TaskIdValueObject implements ValueObject {
    constructor(readonly _value: string) {
        this.validate(_value);
    }

    @OverwriteProtectionBody(false)
    validate(value: string): void {
        if (!validate(value)) {
            throw new ValidationError(`TaskIdValueObject: ${value} is invalid`);
        }
    }

    @OverwriteProtectionBody(false)
    equals(other: ValueObject): boolean {
        return other && isType(other, TaskIdValueObject) && shallowEqualObject(this, other);
    }

    get value(): string {
        return this._value;
    }
}
