
import * as inspectors from 'decorator-inspectors';

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function logConstructor(constructor: Function) {
    const ret = {
        constructor,
        extensible: Object.isExtensible(constructor),
        frozen: Object.isFrozen(constructor),
        sealed: Object.isSealed(constructor),
        values: Object.values(constructor),
        properties: Object.getOwnPropertyDescriptors(constructor),
        members: {}
    };
    for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
        ret.members[key] = constructor.prototype[key];
    }

    console.log(`ClassDecoratorExample `, ret);
}


// @logConstructor
// @sealed
@inspectors.LogClassInspector
class ClassDecoratorExample {
    constructor(x: number, y: number) {
        console.log(`ClassDecoratorExample(${x}, ${y})`);
    }
    method() {
        console.log(`method called`);
    }
}

new ClassDecoratorExample(3, 4).method()
new ClassDecoratorExample(4, 5).method()