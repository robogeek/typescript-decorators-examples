import * as util from 'util';
import * as inspectors from 'decorator-inspectors';

function logMethod(target: Object, propertyKey: string,
    descriptor: PropertyDescriptor) {

    console.log(`logMethod`, {
        target, propertyKey, descriptor, 
        targetKeys: Object.getOwnPropertyNames(target),
        funcion: descriptor.value,
        funcText: descriptor.value.toString()
    });
}

class MethodExample {

    // @inspectors.LogMethodInspector
    @logMethod
    method(x: number) {
        return x * 2;
    }

}

/* const me = new MethodExample();
console.log(me.method(10));
console.log(me.method(12));
console.log(me.method(-5));
*/