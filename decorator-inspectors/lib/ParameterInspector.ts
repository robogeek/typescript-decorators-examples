import 'reflect-metadata';
import * as util from 'util';
import { functionData } from './Utils';

export function LogParameterInspector(target: Object,
    propertyKey: string | symbol,
    parameterIndex: number) {

    console.log(`LogParameterInspector ${target} ${String(propertyKey)} ${parameterIndex}`);
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
        console.log(`ParameterInspector target ${target} key ${key}`);
        try {
            ret.members[key] = {
                obj: target[key],
                descriptor: util.inspect(Object.getOwnPropertyDescriptor(target, key))
            };
        } catch (e) {
            ret.members[key] = {
                error: `ParameterInspector could not get data for ${key}`,
                message: e.message
            }
        }
        /* if (typeof target[key] === 'function') {
            ret.members[key] = functionData(target[key]);
        } else {
            ret.members[key] = target[key];
        } */
    }
    return ret;

}
