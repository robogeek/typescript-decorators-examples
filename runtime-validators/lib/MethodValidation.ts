
import "reflect-metadata";

import { Validators } from './ParameterValidators.js';

export function ValidateParams(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
    // Store the original value
    const savedValue = descriptor.value;
    // Attach validation logic
    descriptor.value = (...args: any[]) => {
        const validators = Validators(target, propertyKey) || {};

        for (const key in Reflect.ownKeys(validators)) {
            const funclist = validators[key];
            const value = args[key];
            for (const func of funclist) {
                func(value);
            }
        }
        // Actually call the function
        return Reflect.apply(savedValue, target, args);
    };
}
