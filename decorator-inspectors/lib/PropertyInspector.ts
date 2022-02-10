import 'reflect-metadata';
import * as util from 'util';

export function LogPropertyInspector(target: Object, member: string): any {
    console.log(PropertyInspector(target, member));
}

export function PropertyInspector(target: Object, member: string): any {
    return {
        target,
        targetKeys: Object.keys(target),
        member,
        ownKeys: Reflect.ownKeys(target),
        design: {
            type: 
                Reflect.getMetadata("design:type",
                            target, member),
            paramtypes:
                Reflect.getMetadata("design:paramtypes",
                            target, member),
            returntype:
                Reflect.getMetadata("design:returntype",
                            target, member)
        }
    };
}

// PropertySpy doesn't seem to do what I expected...
// Namely it did not spy on get/set of the property

/* export function PropertySpy<T>() {
    return (target: Object, member: string) => {

        const desc = Object.getOwnPropertyDescriptor(target, member);
        console.log(`PropertySpy descriptor ${member}`, desc);

        if (desc) {
            const originals = {
                get: desc.get, set: desc.set
            };
            if (desc.get) {
                desc.get = () => {
                    const ret = originals.get();
                    console.log(`PropertySpy get ${member}`, ret);
                    return ret;
                };
            }
            if (desc.set) {
                desc.set = (newval: T) => {
                    originals.set(newval);
                    console.log(`PropertySpy set ${member}`, newval);
                }
            }
        } else {
            let value: T;
            Object.defineProperty(target, member, {
                enumerable: true,
                get: () => {
                    console.log(`PropertySpy get ${member}`, value);
                    return value;
                },
                set: (v: T) => {
                    console.log(`PropertySpy set ${member}`, v);
                    value = v;
                }
            });
        }
    }
} */
