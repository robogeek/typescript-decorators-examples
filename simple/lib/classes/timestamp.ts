
import { v4 as uuidv4 } from 'uuid';

function TimeStamp<T extends { new(...args: any[]): {}}>(target: T) {

    // Using Object.defineProperty affects the class
    // object rather than instances

    /* Object.defineProperty(target, "uuid", {
        value: uuidv4()
    });
    Object.defineProperty(target, "created", {
        value: new Date().toLocaleString("en-US")
    });
    Object.defineProperty(target, "hello", {
        value: (msg: string) => { console.log(`Extended ${msg}`); }
    }); */

    return class extends target {
        uuid = uuidv4();
        created = new Date().toLocaleString("en-US");

        hello(msg: string) { console.log(`Extended ${msg}`); }
    }
}

/* function TimeStamp(target: Function) {
    Reflect.defineProperty(target, "uuid", {
        value: uuidv4()
    });
    Reflect.defineProperty(target, "created", {
        value: new Date().toLocaleString("en-US")
    });
    Reflect.defineProperty(target, "hello", {
        value: (msg: string) => { console.log(`Extended ${msg}`); }
    });
} */

@TimeStamp
class ClockIn {

}

@TimeStamp
class ClockOut {

}

const ci = new ClockIn();
const ci2 = new ClockIn();
const co = new ClockOut();

// console.log(ClockIn["uuid2"]);
// console.log(ClockIn["created2"]);

console.log(ci);
console.log(ci2);
console.log(co);

console.log(ci.hasOwnProperty('uuid'));
console.log(ci['uuid']);
console.log((<any>ci).uuid);
ci['hello']('World');
(<any>ci).hello('World #2');
