
import * as util from 'util';
import * as inspectors from 'decorator-inspectors';

function logConstructor(constructor: Function) {
    console.log(`ExampleClass ${util.inspect(constructor)} name ${constructor.prototype.name} ${constructor.prototype.displayName} arguments ${util.inspect(constructor.prototype.arguments)} method ${util.inspect(constructor.prototype.method)}`);
}

function withParam(path: string) {
    console.log(`outer withParam ${path}`);
    return (target: Function) => {
        console.log(`inner withParam ${path}`);
    };
}

@withParam('first')
@withParam('middle')
@withParam('last')
class ExampleClass {
    constructor(x: number, y: number) {
        console.log(`ExampleClass(${x}, ${y})`);
    }
    method() {
        console.log(`method called`);
    }
}

new ExampleClass(3, 4).method()


function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class SealedClass {
    x: number;
    y: number;

    area() { return this.x * this.y; }
}

/* 
@sealed
class SealedClass2 extends SealedClass {
    z: number;

    volume() { return this.x * this.y * this.z; }
}

const sc = new SealedClass()
sc.x = 3;
sc.y = 6;
sc.z = 100;

console.log(sc.area());

const sc2 = new SealedClass2();
sc2.x = 3;
sc2.y = 6;
sc2.z = 100;

console.log(sc2.area());
console.log(sc2.volume());
*/

