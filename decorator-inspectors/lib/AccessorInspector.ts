import 'reflect-metadata';
import * as util from 'util';

export function LogAccessorInspector(target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {
    
    console.log(AccessorInspector(target, propertyKey, descriptor));
}

export function AccessorInspector(target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

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


export function AccessorSpy<T>() {
    return function (target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

        const originals = {
            get: descriptor.get,
            set: descriptor.set
        };
        if (originals.get) {
            descriptor.get = function (): T {
                const ret: T = originals.get.call(this);
                console.log(`AccessorSpy get ${String(propertyKey)}`, ret);
                return ret;
            };
        }
        if (originals.set) {
            descriptor.set = function(newval: T) {
                console.log(`AccessorSpy set ${String(propertyKey)}`, newval);
                originals.set.call(this, newval);
            };
        }
    }
}
