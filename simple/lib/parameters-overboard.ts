import 'reflect-metadata';
import * as util from 'util';

function logParameter(target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) {

    console.log(`logParameter ${target} ${String(propertyKey)} ${parameterIndex}`);
}

class ParameterExample {

    member(@logParameter x: number,
        @logParameter y: number) {
        console.log(`member ${x} ${y}`);
    }
}

const pex = new ParameterExample();
pex.member(2, 3);
pex.member(3, 5);
pex.member(5, 8);


// 1. class decorator with object for configuration
// 2. decorator that inserts field from YAML as value for parameter

const optionsKey = Symbol('options');
const paramsToSet = Symbol('paramsList');
const containingClass = Symbol('containingClass');

function ShowConfiguration(constructor: Function) {
    const opts = Reflect.getMetadata(optionsKey, constructor);
    console.log(`ShowConfiguration `, opts);
    console.log(`ShowConfiguration target `, util.inspect(constructor));
    const paramsList = Reflect.getMetadata(paramsToSet, constructor, 'connect');
    console.log(`ShowConfiguration paramsList`, paramsList);
}

function Configure(options) {
    return (constructor: Function) => {
        Reflect.defineMetadata(optionsKey, options, constructor);
        console.log(`Configure `, Reflect.ownKeys(constructor.prototype));

        for (let key of Reflect.ownKeys(constructor.prototype)) {

            Reflect.defineMetadata(containingClass, constructor, constructor.prototype[key]);
            /* console.log(`paramsToSet ${String(key)} `,
                Reflect.getMetadata(
                    paramsToSet,
                    constructor.prototype[key],
                    key,
                )); */

        }
        console.log((constructor.prototype['connect'] as Function));
    };
}

function ConfigParam(optName: string) {
    return (target: Object, propertyKey: string | symbol,
                    parameterIndex: number) => {

        console.log(`ConfigParam target ${String(propertyKey)} ${parameterIndex} ${optName} `, target);
        const paramToSet = {
            key: propertyKey, index: parameterIndex, option: optName
        };
        let paramsList = Reflect.getOwnMetadata(
                        paramsToSet, target, propertyKey);
        if (!paramsList) paramsList = [];
        paramsList.push(paramToSet);
        Reflect.defineMetadata(
                        paramsToSet, paramsList, target, propertyKey);

        paramsList = Reflect.getOwnMetadata(
                        paramsToSet, target, propertyKey);
        console.log(`ConfigParam`, paramsList);

        // const opts = Reflect.getMetadata(optionsKey, target);

        // console.log(`ConfigParam target ${String(propertyKey)} ${parameterIndex} `, opts);
    }
}

function Configurable(target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {
        

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {

        console.log(`Configurable originalMethod `, originalMethod);

        console.log(`Configurable originalMethod constructor `,
            Reflect.getMetadata(containingClass, originalMethod));
        
        console.log(`Configurable originalMethod keys `,
            Reflect.getMetadataKeys(originalMethod));
        console.log(`Configurable originalMethod ownkeys `,
            Reflect.getOwnMetadataKeys(originalMethod));

        const prototypeTarget = Reflect.getPrototypeOf(target);
        const opts = Reflect.getMetadata(optionsKey, originalMethod);
        console.log(`Configurable options`, opts);
        console.log(`Configurable target (${typeof target})`, target);

        console.log(`Configurable metdataKeys ${Reflect.getMetadataKeys(target)}`);

        console.log(`Configurable ownMetadata ${Reflect.getOwnMetadata(optionsKey, target)}`);

        console.log(`Configurable ownMetadataKeys ${Reflect.getOwnMetadataKeys(target)}`);

        console.log(`Configurable target prototype ${util.inspect(Reflect.getPrototypeOf(target))}`);

        const paramsList = Reflect.getOwnMetadata(
            paramsToSet, target, propertyKey);
        console.log(`Configurable paramsList ${util.inspect(paramsList)}`);
        for (const param of paramsList) {
            args[param.index] = param.option;
        }
        console.log(`MethodSpy before ${propertyKey}`, args);
        const result = originalMethod.apply(this, args);
        console.log(`MethodSpy after ${propertyKey}`, result);
        return result;
    }
}

@ShowConfiguration
@Configure({
    host: 'localhost',
    port: 3306,
    dbtype: 'mysql'
})
class ParameterExample2 {

    constructor() {
        console.log(`ParameterExample2 constructor`);
    }

    @Configurable
    connect(
        @ConfigParam('host') host: string,
        @ConfigParam('port') port: number,
        @ConfigParam('dbtype') dbtype: string) {
        
        console.log(`connect ${host} ${port} ${dbtype}`);
    }
}

console.log(`Before create ParameterExample2`);
const pex2 = new ParameterExample2();
pex2.connect('a', 3066, 'b');
console.log(`After create ParameterExample2`);

console.log('options ', Reflect.getMetadata(
    optionsKey, ParameterExample2
));
console.log('paramsList ', Reflect.getMetadata(
    paramsToSet,
    pex2,
    "connect",
));

