
class HasExample {

    year: number;
    #privateYear: number;
    #title: string;

    set title(nt: string) { this.#title = nt; }
    get title() { return this.#title; }

    // set privateYear(ny: number) { this.#privateYear = ny; }
    // get privateYear() { return this.#privateYear; }

    area(x: number, y: number) {
        return x * y;
    }

    constructor(privateYear: number) {
        this.#privateYear = privateYear;
    }
}

const hs = new HasExample(2222);

console.log(`year ${Reflect.has(hs, 'year')}`);
hs.year = 2022;
console.log(`year ${Reflect.has(hs, 'year')}`);

console.log(`privateYear ${Reflect.has(hs, 'privateYear')}`);
// hs.privateYear = 2222;
console.log(`privateYear ${Reflect.has(hs, 'privateYear')}`);
console.log(`title ${Reflect.has(hs, 'title')}`);
console.log(`area ${Reflect.has(hs, 'area')}`);
console.log(`xyzzy ${Reflect.has(hs, 'xyzzy')}`);

console.log({
    ownKeys: Reflect.ownKeys(hs),
    keys: Object.keys(hs)
});

console.log({
    ownProperty: Reflect.getOwnPropertyDescriptor(hs, "year"),
    objectProperty: Object.getOwnPropertyDescriptor(hs, "year")
});

console.log({
    ownProperty: Reflect.getOwnPropertyDescriptor(hs, "title"),
    objectProperty: Object.getOwnPropertyDescriptor(hs, "title")
});

console.log({
    reflectPrototype: Reflect.getPrototypeOf(hs),
    objectPrototype: Object.getPrototypeOf(hs),
    prototype: HasExample.prototype
});

