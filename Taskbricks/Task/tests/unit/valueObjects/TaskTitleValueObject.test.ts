import { describe, it } from "mocha";
import { expect } from "chai";
import { ValidationError } from "@codebricks/typebricks";
import { TaskTitleValueObject } from "shared/domain/valueObjects/TaskTitleValueObject";

const validValues: string[] = ['foo', 'bar'];
const invalidValues = [''];

describe('TaskTitleValueObject',
    /** @overwrite-protection-body false */
    async function() {
        it('test construct.', function() {
            validValues.forEach((validValue: string) => {
                const taskTitleValueObject: TaskTitleValueObject = new TaskTitleValueObject(validValue);
                expect(taskTitleValueObject.value).equal(validValue);
            });
        });
        it('test construct (negative).', function() {
            invalidValues.forEach((invalidValue: any) => {
                expect(() => new TaskTitleValueObject(invalidValue)).to.throw(ValidationError);
            });
        });
        it('test equals.', function() {
            const taskTitleValueObject0: TaskTitleValueObject = new TaskTitleValueObject(validValues[0]);
            const taskTitleValueObject1: TaskTitleValueObject = new TaskTitleValueObject(validValues[0]);
            expect(taskTitleValueObject0.equals(taskTitleValueObject1)).to.be.true;
        });
        it('test equals (negative).', function() {
            const taskTitleValueObject0: TaskTitleValueObject = new TaskTitleValueObject(validValues[0]);
            const taskTitleValueObject1: TaskTitleValueObject = new TaskTitleValueObject(validValues[1]);
            expect(taskTitleValueObject0.equals(taskTitleValueObject1)).to.be.false;
        });
    });

