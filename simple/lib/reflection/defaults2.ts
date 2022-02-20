

/* function setDefaults -- Looks for parameter data on the same class and method with @ParamDefaults decorators

function ParamDefaults -- records data for SetDefaults to use 

But, how to check that target values equal? */

import 'reflect-metadata';

const DEFAULTS = 'defaults';

function SetDefaults(target: Object, propertyKey: string,
    descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`SetDefaults before ${propertyKey}`, args);

        const defaults = Reflect.getMetadata(DEFAULTS, target, propertyKey)
                        || {};
        // const defaultKeys = Reflect.getMetadataKeys(target, propertyKey);
        // console.log(defaults);
        // console.log(defaultKeys);
        for (const key of Object.keys(defaults)) {
            let def = defaults[key];
            // console.log(def);
            if (typeof args[key] === 'undefined'
                || args[key] === null) {
                args[key] = def;
            }
        }
        /* for (cosnt key of defaultKeys) {
            if (typeof args[def.parameterIndex] === 'undefined'
                || args[def.parameterIndex] === null) {
                args[def.parameterIndex] = def.value;
            }
        } */

        console.log(`SetDefaults after substitution ${propertyKey}`, args);
        const result = originalMethod.apply(this, args);
        console.log(`SetDefaults after ${propertyKey}`, result);
        return result;
    }
}

function ParamDefault<T>(value: T) {
    return (target: Object, propertyKey: string | symbol,
        parameterIndex: number)=> {

        const defaults = Reflect.getMetadata(DEFAULTS, target, propertyKey)
                        || {};
        defaults[parameterIndex] = value;
        Reflect.defineMetadata(DEFAULTS, defaults, target, propertyKey);
    }
}

class DefaultExample {

    @SetDefaults
    volume(
        z: number,
        @ParamDefault<number>(10) x?: number,
        @ParamDefault<number>(15) y?: number,
        title?: string
    ) {
        const ret = {
            x, y, z, volume: x * y * z, title
        };
        console.log(`volume `, ret);
        return ret;
    }
}

const de = new DefaultExample();

console.log(de.volume(10));
console.log('----------------------');
console.log(de.volume(20, null, 20, "Second"));
console.log('----------------------');
console.log(de.volume(30, 30, null));
console.log('----------------------');
console.log(de.volume(40, 40, 50, "Fourth"));
