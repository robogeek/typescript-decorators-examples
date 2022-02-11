import 'reflect-metadata';
import * as util from 'util';

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
        prototypeKeys: Reflect.ownKeys(constructor.prototype),
        prototypeMembers: {}
    };
    for (const key of Reflect.ownKeys(constructor.prototype)) {
        ret.prototypeMembers[key] = constructor.prototype[key];
    }
    return ret;
}
