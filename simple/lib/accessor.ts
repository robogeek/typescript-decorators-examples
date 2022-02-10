import * as util from 'util';
import * as inspectors from 'decorator-inspectors';


function SyntheticProperty<T>(validate ?: Function) {
    return (target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor) => {
        
        let value: T;
        // Using the `descriptor` object to store the value
        // results in an error message:
        //
        //      Invalid property descriptor. Cannot both specify accessors and a value or writable attribute,
        //
        // descriptor.writable = true;
        // descriptor.value = <T>null;
        descriptor.enumerable = true;
        descriptor.get = () => {
            console.log(`SyntheticProperty get ${propertyKey} ${value}`);
            return value;
        };
        descriptor.set = (v: T) => {
            console.log(`SyntheticProperty set ${propertyKey} ${v}`);
            if (validate) {
                if (!validate(v)) {
                    throw new Error(`Invalid value ${v}`);
                }
            }
            value = v;
        };
        Object.defineProperty(target, propertyKey, descriptor);
    }
}

class AccessorExample {

    // _name: string;

    @inspectors.AccessorSpy
    @inspectors.LogAccessorInspector
    @SyntheticProperty<string>((v: string) => {
        console.log(`name property validator ${v}`);
        if (typeof v !== 'string') return false;
        return true;
    })
    @inspectors.LogAccessorInspector
    set name(n) { /* this._name = n; */ }
}

const ae = new AccessorExample();

ae.name = "Henry Potter";
console.log(ae.name);

ae.name = "Harry Oldfield";
console.log(ae.name);

// The following should fail validation

ae.name = 123;
console.log(ae.name);

ae.name = null;
console.log(ae.name);

