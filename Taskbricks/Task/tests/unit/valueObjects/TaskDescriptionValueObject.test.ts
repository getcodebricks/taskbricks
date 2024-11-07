import { describe, it } from "mocha";
import { expect } from "chai";
import { ValidationError } from "@codebricks/typebricks";
import { TaskDescriptionValueObject } from "shared/domain/valueObjects/TaskDescriptionValueObject";

const validValues: string[] = ['foo', 'bar'];
const invalidValues = [''];

describe('TaskDescriptionValueObject',
    /** @overwrite-protection-body false */
    async function() {
        it('test construct.', function() {
            validValues.forEach((validValue: string) => {
                const taskDescriptionValueObject: TaskDescriptionValueObject = new TaskDescriptionValueObject(validValue);
                expect(taskDescriptionValueObject.value).equal(validValue);
            });
        });
        it('test construct (negative).', function() {
            invalidValues.forEach((invalidValue: any) => {
                expect(() => new TaskDescriptionValueObject(invalidValue)).to.throw(ValidationError);
            });
        });
        it('test equals.', function() {
            const taskDescriptionValueObject0: TaskDescriptionValueObject = new TaskDescriptionValueObject(validValues[0]);
            const taskDescriptionValueObject1: TaskDescriptionValueObject = new TaskDescriptionValueObject(validValues[0]);
            expect(taskDescriptionValueObject0.equals(taskDescriptionValueObject1)).to.be.true;
        });
        it('test equals (negative).', function() {
            const taskDescriptionValueObject0: TaskDescriptionValueObject = new TaskDescriptionValueObject(validValues[0]);
            const taskDescriptionValueObject1: TaskDescriptionValueObject = new TaskDescriptionValueObject(validValues[1]);
            expect(taskDescriptionValueObject0.equals(taskDescriptionValueObject1)).to.be.false;
        });
    });

