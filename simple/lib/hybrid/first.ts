
const accessorfunc = (target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor) => {};

const constructorfunc = (constructor: Function) => {};

const methodsfunc = (target: Object, propertyKey: string,
    descriptor: PropertyDescriptor) => {};

const parametersfunc = (target: Object,
    propertyKey: string | symbol,
    parameterIndex: number) => {};

const propertiesfunc = (target: Object, member: string): any  => {};

const isset = (val) => {
    return typeof val !== 'undefined' && val !== null;
};
const notset = (val) => {
    return (typeof val === 'undefined') || (val === null);
};

const isClassDecorator = (target: Object, 
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    return (isset(target)
         && notset(propertyKey)
         && notset(descriptor));
};

const isPropertyDecorator = (target: Object, 
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    return (isset(target)
         && isset(propertyKey)
         && notset(descriptor));
};

const isParameterDecorator = (target: Object, 
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    return (isset(target)
         && isset(propertyKey)
         && isset(descriptor) 
         && typeof descriptor === 'number');
};

const isMethodDecorator = (target: Object, 
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    if ((isset(target)
     && isset(propertyKey)
     && isset(descriptor) 
     && typeof descriptor === 'object')) {
        const propdesc = <PropertyDescriptor>descriptor;
        return (typeof propdesc.value === 'function');
    } else {
        return false;
    }
}

const isAccessorDecorator = (target: Object, 
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    if ((isset(target)
     && isset(propertyKey)
     && isset(descriptor) 
     && typeof descriptor === 'object')) {
        const propdesc = <PropertyDescriptor>descriptor;
        return (typeof propdesc.value !== 'function')
         && (typeof propdesc.get === 'function'
          || typeof propdesc.set === 'function');
    } else {
        return false;
    }
}

function Decorator(target: Object, 
                    propertyKey?: string | symbol,
                    descriptor?: number | PropertyDescriptor) {

    // console.log(`Decorator target`, target);
    // console.log(`Decorator propertyKey`, propertyKey);
    // console.log(`Decorator descriptor`, descriptor);

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

    /* if (notset(propertyKey) && notset(descriptor)) {
        console.log(`Decorator called on class`, target);
    } else if (notset(descriptor)) {
        console.log(`Decorator called on property ${target} ${String(propertyKey)}`);
    } else if (isset(target)
            && isset(propertyKey)
            && isset(descriptor) 
            && typeof descriptor === 'number') {
        console.log(`Decorator called on parameter ${target} ${String(propertyKey)} ${descriptor}`);
    } else if (isset(target)
            && isset(propertyKey)
            && isset(descriptor) 
            && typeof descriptor === 'object') {
        const propdesc = <PropertyDescriptor>descriptor;
        if (typeof propdesc.value === 'function') {
            console.log(`Decorator called on method ${target} ${String(propertyKey)}`, propdesc);
        } else if (typeof propdesc.get === 'function'
                || typeof propdesc.set === 'function') {
            console.log(`Decorator called on accessor ${target} ${String(propertyKey)}`, propdesc);
        }
        else {
            console.error(`Decorator called on unknown thing`, target);
            console.error(`Decorator called on unknown thing`, propertyKey);
            console.error(`Decorator called on unknown thing`, descriptor);
        }
    }
    else {
        console.error(`Decorator called on unknown thing`, target);
        console.error(`Decorator called on unknown thing`, propertyKey);
        console.error(`Decorator called on unknown thing`, descriptor);
    } */
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
