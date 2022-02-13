
export function LogAccessor(target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

    console.log(`LogAccessor`, {
        target, propertyKey, descriptor
    });
}

class Simple {

    #num: number;

    @LogAccessor
    set num(w: number) { this.#num = w; }
    get num() { return this.#num; }

}

const s1 = new Simple();
const s2 = new Simple();

s1.num = 1;
s2.num = 1;
console.log(`${s1.num} ${s2.num}`);

s1.num = s1.num + s2.num;
s2.num = s1.num + s2.num;
console.log(`${s1.num} ${s2.num}`);

s1.num = s1.num + s2.num;
s2.num = s1.num + s2.num;
console.log(`${s1.num} ${s2.num}`);

s1.num = s1.num + s2.num;
s2.num = s1.num + s2.num;
console.log(`${s1.num} ${s2.num}`);

s1.num = s1.num + s2.num;
s2.num = s1.num + s2.num;
console.log(`${s1.num} ${s2.num}`);

s1.num = s1.num + s2.num;
s2.num = s1.num + s2.num;
console.log(`${s1.num} ${s2.num}`);

