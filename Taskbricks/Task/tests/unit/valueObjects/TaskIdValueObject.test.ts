import { describe, it } from "mocha";
import { expect } from "chai";
import { ValidationError } from "@codebricks/typebricks";
import { TaskIdValueObject } from "shared/domain/valueObjects/TaskIdValueObject";

const validValues: string[] = ['86182cd8-a3b2-4e60-8375-25593054c9ac', '845ea68b-73ef-4371-9782-3182ffe51600'];
const invalidValues = ['foo'];

describe('TaskIdValueObject',
    /** @overwrite-protection-body false */
    async function() {
        it('test construct.', function() {
            validValues.forEach((validValue: string) => {
                const taskIdValueObject: TaskIdValueObject = new TaskIdValueObject(validValue);
                expect(taskIdValueObject.value).equal(validValue);
            });
        });
        it('test construct (negative).', function() {
            invalidValues.forEach((invalidValue: any) => {
                expect(() => new TaskIdValueObject(invalidValue)).to.throw(ValidationError);
            });
        });
        it('test equals.', function() {
            const taskIdValueObject0: TaskIdValueObject = new TaskIdValueObject(validValues[0]);
            const taskIdValueObject1: TaskIdValueObject = new TaskIdValueObject(validValues[0]);
            expect(taskIdValueObject0.equals(taskIdValueObject1)).to.be.true;
        });
        it('test equals (negative).', function() {
            const taskIdValueObject0: TaskIdValueObject = new TaskIdValueObject(validValues[0]);
            const taskIdValueObject1: TaskIdValueObject = new TaskIdValueObject(validValues[1]);
            expect(taskIdValueObject0.equals(taskIdValueObject1)).to.be.false;
        });
    });

