import 'reflect-metadata';
import * as util from 'util';
import { functionData } from './Utils';

export function LogParameterInspector(target: Object,
    propertyKey: string | symbol,
    parameterIndex: number) {

    console.log(ParameterInspector(target, propertyKey, parameterIndex));
}

export function ParameterInspector(target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) {

    const ret = {
        target, propertyKey, parameterIndex,
        ownKeys: Object.getOwnPropertyNames(target),
        members: {},
        design: {
            type: 
                Reflect.getMetadata("design:type",
                            target, propertyKey),
            paramtypes:
                Reflect.getMetadata("design:paramtypes",
                            target, propertyKey),
            returntype:
                Reflect.getMetadata("design:returntype",
                            target, propertyKey)
        }
    };
    for (const key of Object.getOwnPropertyNames(target)) {
        ret.members[key] = {
            obj: target[key],
            descriptor: util.inspect(Object.getOwnPropertyDescriptor(target, key))
        };
        /* if (typeof target[key] === 'function') {
            ret.members[key] = functionData(target[key]);
        } else {
            ret.members[key] = target[key];
        } */
    }
    return ret;

}
