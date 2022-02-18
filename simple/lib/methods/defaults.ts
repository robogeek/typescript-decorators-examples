

/* function setDefaults -- Looks for parameter data on the same class and method with @ParamDefaults decorators

function ParamDefaults -- records data for SetDefaults to use 

But, how to check that target values equal? */

const paramDefaults = [];

function findDefaults(target: Object, propertyKey: string) {
    const ret = [];
    for (const def of paramDefaults) {
        if (target === def.target && propertyKey === def.propertyKey) {
            ret.push(def);
        }
    }
    return ret;
}

function SetDefaults(target: Object, propertyKey: string,
    descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`SetDefaults before ${propertyKey}`, args);

        for (const def of findDefaults(target, propertyKey)) {
            if (typeof args[def.parameterIndex] === 'undefined'
             || args[def.parameterIndex] === null) {
                args[def.parameterIndex] = def.value;
            }
        }

        console.log(`SetDefaults after substitution ${propertyKey}`, args);
        const result = originalMethod.apply(this, args);
        console.log(`SetDefaults after ${propertyKey}`, result);
        return result;
    }
}

function ParamDefault<T>(value: T) {
    return (target: Object, propertyKey: string | symbol,
        parameterIndex: number)=> {
        
        paramDefaults.push({
            target, propertyKey, parameterIndex, value
        });
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
