import { ValueObject, ValidationError, OverwriteProtectionBody, shallowEqualObject } from "@codebricks/typebricks";
import { isType } from "is-what";

export class TaskTitleValueObject implements ValueObject {
    constructor(readonly _value: string) {
        this.validate(_value);
    }

    @OverwriteProtectionBody(false)
    validate(value: string): void {
        if (!isType(value, String) || !value.length) {
            throw new ValidationError(`TaskTitleValueObject: ${value} is invalid`);
        }
    }

    @OverwriteProtectionBody(false)
    equals(other: ValueObject): boolean {
        return other && isType(other, TaskTitleValueObject) && shallowEqualObject(this, other);
    }

    get value(): string {
        return this._value;
    }
}
