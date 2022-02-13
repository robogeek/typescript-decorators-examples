
import { LogAccessor } from './first.js';

/* function LogAccessor(target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

    console.log(`LogAccessor`, {
        target, propertyKey, descriptor
    });
} */

class Rectangle {
    #width: number;
    #height: number;

    @LogAccessor
    get area() { 
        if (typeof this.#width !== 'undefined'
         && typeof this.#height !== 'undefined') {
            return this.#width * this.#height;
        } else {
            throw new Error(`Must have both height and width`);
        }
    }

    constructor(width?: number, height?: number) {
        this.#width = width;
        this.#height = height;
    }
}

const r1 = new Rectangle(3, 5);
console.log(r1.area);
