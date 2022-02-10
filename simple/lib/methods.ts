import * as util from 'util';
import * as inspectors from 'decorator-inspectors';

function logMethod(target: any, 
    propertyKey: string, 
    descriptor: PropertyDescriptor) {
    
    console.log(`logMethod ${target} ${propertyKey} ${util.inspect(descriptor)} ${util.inspect(descriptor.value)}`);
}

function MethodSpy(target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`MethodSpy before ${propertyKey}`, args);
        const result = originalMethod.apply(this, args);
        console.log(`MethodSpy after ${propertyKey}`, result);
        return result;
    }
}

class MethodExample {

    @inspectors.LogMethodInspector
    @MethodSpy
    method(x: number) {
        return x * 2;
    }

    @MethodSpy
    area(width: number, height: number) {
        return width * height;
    }
}

const me = new MethodExample();
console.log(me.method(10));
console.log(me.method(12));
console.log(me.method(-5));

console.log(me.area(6, 10));
console.log(me.area(16, 20));
