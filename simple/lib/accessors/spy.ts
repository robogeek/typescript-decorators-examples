
import { LogAccessor } from './first.js';
import * as inspectors from 'decorator-inspectors';

/* export function AccessorSpy<T>() {
    return function (target: Object,
    propertyKey: string | symbol,
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
} */

class ToSpy {

    #num: number;

    @inspectors.AccessorSpy<number>()
    set num(w: number) { this.#num = w; }
    get num() { return this.#num; }

}

const tsp1 = new ToSpy();
const tsp2 = new ToSpy();

tsp1.num = 1;
tsp2.num = 2;
console.log(`${tsp1.num} ${tsp2.num}`);

tsp1.num = tsp1.num + tsp2.num;
tsp2.num = tsp1.num + tsp2.num;
console.log(`${tsp1.num} ${tsp2.num}`);

tsp1.num = tsp1.num + tsp2.num;
tsp2.num = tsp1.num + tsp2.num;
console.log(`${tsp1.num} ${tsp2.num}`);


tsp1.num = tsp1.num + tsp2.num;
tsp2.num = tsp1.num + tsp2.num;
console.log(`${tsp1.num} ${tsp2.num}`);


