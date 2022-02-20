import 'reflect-metadata';
import * as util from 'util';

export function LogMethodInspector(target: Object, 
    propertyKey: string, descriptor: PropertyDescriptor) {
    
    console.log(`LogMethodInspector ${target} ${propertyKey}`, descriptor);
    console.log(MethodInspector(target, propertyKey, descriptor));
}

export function MethodInspector(target: Object, 
    propertyKey: string, descriptor: PropertyDescriptor) {
    
    return {
        target, propertyKey, descriptor,
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
