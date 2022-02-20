
import {
    isClassDecorator, isPropertyDecorator, isParameterDecorator,
    isMethodDecorator, isAccessorDecorator
} from 'decorator-inspectors';


function Decorator(target: Object, 
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) {

    if (isClassDecorator(target, propertyKey, descriptor)) {
        console.log(`Decorator called on class`, target);
    } else if (isPropertyDecorator(target, propertyKey, descriptor)) {
        console.log(`Decorator called on property ${target} ${String(propertyKey)}`);
    } else if (isParameterDecorator(target, propertyKey, descriptor)) {
        console.log(`Decorator called on parameter ${target} ${String(propertyKey)} ${descriptor}`);
    } else if (isMethodDecorator(target, propertyKey, descriptor)) {
        console.log(`Decorator called on method ${target} ${String(propertyKey)}`, descriptor);
    } else if (isAccessorDecorator(target, propertyKey, descriptor)) {
        console.log(`Decorator called on accessor ${target} ${String(propertyKey)}`, descriptor);
    }
    else {
        console.error(`Decorator called on unknown thing`, target);
        console.error(`Decorator called on unknown thing`, propertyKey);
        console.error(`Decorator called on unknown thing`, descriptor);
    }
}


@Decorator
class HybridDecorated {
    @Decorator
    prop1: number;

    @Decorator
    prop2: string;

    @Decorator
    method(
        @Decorator param1: string,
        @Decorator param2: string
    ) {
        console.log(`inside method function`);
        return { param1, param2 };
    }

    #meaning: number = 42;

    @Decorator
    get meaning() { return this.#meaning; }
    set meaning(nm: number) { this.#meaning = nm; }

}

const hd = new HybridDecorated();

console.log(hd.method('foo', 'baz'));
