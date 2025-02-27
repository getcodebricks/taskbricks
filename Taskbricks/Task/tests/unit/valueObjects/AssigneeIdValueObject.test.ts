import { describe, it } from "mocha";
import { expect } from "chai";
import { ValidationError } from "@codebricks/typebricks";
import { AssigneeIdValueObject } from "shared/domain/valueObjects/AssigneeIdValueObject";

const validValues: string[] = ['50f5c256-846e-4c34-9f4c-c6e31baf8a98', 'd6327f91-4840-4c65-a58d-f6d13d3b95a1'];
const invalidValues = ['foo'];

describe('AssigneeIdValueObject',
    /** @overwrite-protection-body false */
    async function() {
        it('test construct.', function() {
            validValues.forEach((validValue: string) => {
                const assigneeIdValueObject: AssigneeIdValueObject = new AssigneeIdValueObject(validValue);
                expect(assigneeIdValueObject.value).equal(validValue);
            });
        });
        it('test construct (negative).', function() {
            invalidValues.forEach((invalidValue: any) => {
                expect(() => new AssigneeIdValueObject(invalidValue)).to.throw(ValidationError);
            });
        });
        it('test equals.', function() {
            const assigneeIdValueObject0: AssigneeIdValueObject = new AssigneeIdValueObject(validValues[0]);
            const assigneeIdValueObject1: AssigneeIdValueObject = new AssigneeIdValueObject(validValues[0]);
            expect(assigneeIdValueObject0.equals(assigneeIdValueObject1)).to.be.true;
        });
        it('test equals (negative).', function() {
            const assigneeIdValueObject0: AssigneeIdValueObject = new AssigneeIdValueObject(validValues[0]);
            const assigneeIdValueObject1: AssigneeIdValueObject = new AssigneeIdValueObject(validValues[1]);
            expect(assigneeIdValueObject0.equals(assigneeIdValueObject1)).to.be.false;
        });
    });

