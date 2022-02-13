import 'reflect-metadata';
import * as util from 'util';
import { functionData } from './Utils';

export function LogClassInspector(constructor: Function) {
    console.log(ClassInspector(constructor));
}

export function ClassInspector(constructor: Function) {
    const ret = {
        constructor,
        extensible: Object.isExtensible(constructor),
        frozen: Object.isFrozen(constructor),
        sealed: Object.isSealed(constructor),
        values: Object.values(constructor),
        properties: Object.getOwnPropertyDescriptors(constructor),
        ownKeys: Reflect.ownKeys(constructor),
        metadataKeys: Reflect.getMetadataKeys(constructor),
        metadataMembers: {},
        prototypeKeys: Reflect.ownKeys(constructor.prototype),
        prototypeMembers: {}
    };
    for (const key of Reflect.ownKeys(constructor.prototype)) {
        if (typeof constructor.prototype[key] === 'function') {
            ret.prototypeMembers[key] = functionData(constructor.prototype[key]);
        } else {
            ret.prototypeMembers[key] = constructor.prototype[key];
        }
    }
    for (const key of Reflect.getMetadataKeys(constructor)) {
        const obj = Reflect.getMetadata(key, constructor);
        if (typeof obj === 'function') {
            ret.metadataMembers[key] = functionData(obj);
        } /* else if (Array.isArray(obj)) {
            const toadd = [];
            for (const item of obj) {
                if (typeof item === 'function') {
                    toadd.push(functionData(item));
                } else {
                    toadd.push(item);
                }
            }
            ret.metadataMembers[key] = toadd;
        } */ else {
            ret.metadataMembers[key] = obj;
        }
    }
    return ret;
}
