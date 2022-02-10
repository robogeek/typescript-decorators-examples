
import "reflect-metadata";

const VALIDATORS = Symbol('validators');

export function Validators(target: any,
                    propertyKey: string | symbol) {
    return Reflect.getMetadata(VALIDATORS,
                                target, propertyKey);
}

function addValidator(target: any,
                    propertyKey: string | symbol,
                    parameterIndex: number,
                    validator: Function) {

    let existingValidators = Validators(target, propertyKey) || {};

    if (!existingValidators[parameterIndex]) {
        existingValidators[parameterIndex] = [ validator ];
    } else {
        existingValidators[parameterIndex].push(validator);
    }

    // Store metadata
    Reflect.defineMetadata(VALIDATORS,
                existingValidators, target, propertyKey);
}

export function NumberRange(min: number, max: number) {

    return (
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) => {

        const func = (value: number) => {
            if (value < min || value > max) {
                throw new Error(`Value ${value} outside of range [ ${min}, ${max} ]`);
            }
        };
        addValidator(target, propertyKey, parameterIndex, func);
    };
}

export function IsInteger() {

    return (
        target: any,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) => {

        const func = (value: number) => {
            if (typeof value !== 'number') {
                throw new Error(`Value ${value} not a number`);
            }
            if (!Number.isInteger(value)) {
                throw new Error(`Value ${value} not an integer`);
            }
        };
        addValidator(target, propertyKey, parameterIndex, func);
    };
}
