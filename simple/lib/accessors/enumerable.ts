

import * as inspectors from 'decorator-inspectors';

export function Enumerable(val: boolean) {
    return (target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor)  => {
        if (typeof val !== 'undefined') descriptor.enumerable = val;
    }
}

export function LogAccessor(target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

    console.log(`LogAccessor`, {
        target, propertyKey, descriptor
    });
}

class SetEnumerable {

    #num: number;

    @LogAccessor
    @Enumerable(true)
    @LogAccessor
    @inspectors.AccessorSpy<number>()
    set num(w: number) { this.#num = w; }
    get num() { return this.#num; }

}

const en1 = new SetEnumerable();

en1.num = 1;
for (let key in en1) {
    console.log(`en1 ${key} ${en1[key]}`);
}
