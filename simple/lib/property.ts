import 'reflect-metadata';
import * as util from 'util';
import * as inspectors from 'decorator-inspectors';

function logProperty(target: Object, member: string): any {
    console.log(`PropertyExample logProperty ${target} ${member}`);
}

class PropertyExample {

    /* @inspectors.LogPropertyInspector
    @inspectors.PropertySpy<string>() */
    @inspectors.LogPropertyInspector
    name: string;
}

const pe = new PropertyExample();
if (!pe.hasOwnProperty('name')) {
    console.log(`No property 'name' on pe`);
}
pe.name = "Stanley Steamer";
if (!pe.hasOwnProperty('name')) {
    console.log(`No property 'name' on pe`);
}

console.log(pe);

function ValidRange(min: number, max: number) {
    return (target: Object, member: string) => {

        let value: number;
        Object.defineProperty(target, member, {
            enumerable: true,
            get: () => {
                console.log("Inside ValidRange get");
                return value;
            },
            set: (v: number) => {
                console.log(`Inside ValidRange set ${v}`);
                if (v < min || v > max) {
                    throw new Error(`Not allowed value ${v}`);
                }
                value = v;
            }
        });
    }
}


class Student {

    // @inspectors.PropertySpy<number>()
    @inspectors.LogPropertyInspector
    @ValidRange(1900, 2050)
    @inspectors.LogPropertyInspector
    year: number;
}

const stud = new Student();

stud.year = 1901;
console.log(stud.year);
stud.year = 2030;
console.log(stud.year);
stud.year = 1899;
console.log(stud.year);
