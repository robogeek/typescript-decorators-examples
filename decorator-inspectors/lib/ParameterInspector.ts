import 'reflect-metadata';
import * as util from 'util';

export function LogParameterInspector(target: Object,
    propertyKey: string | symbol,
    parameterIndex: number) {

    console.log(ParameterInspector(target, propertyKey, parameterIndex));
}

export function ParameterInspector(target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) {

    return {
        target, propertyKey, parameterIndex,
        ownKeys: Reflect.ownKeys(target),
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
}
