import * as util from 'util';
import * as inspectors from 'decorator-inspectors';


@((constructor: Function) => {
    console.log(`Inline constructor decorator `, constructor);
})
class AccessorExample {

    _name: string;

    @((target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor) => {
        console.log(`Inline Decorator ${target} ${String(propertyKey)} ${descriptor}`);
    })
    set name(n) { this._name = n; }
    get name()  { return this._name; }
}

const ae = new AccessorExample();

ae.name = "Henry Potter";
console.log(ae.name);

ae.name = "Harry Oldfield";
console.log(ae.name);

// The following should fail validation

/* ae.name = 123;
console.log(ae.name); */

ae.name = null;
console.log(ae.name);

