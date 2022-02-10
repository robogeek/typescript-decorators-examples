import 'reflect-metadata';
import * as util from 'util';

export function LogClassInspector(constructor: Function) {
    console.log(ClassInspector(constructor));
}

export function ClassInspector(constructor: Function) {
    return {
        constructor,
        ownKeys: Reflect.ownKeys(constructor),
    };
}

