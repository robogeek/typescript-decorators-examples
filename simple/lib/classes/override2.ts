
import * as util from 'util';

function LogClassCreate<T extends { new(...args: any[]): {}}>(target: T) {

    return class extends target {
        constructor(...args: any[]) {
            super(...args);
            console.log(`Create ${util.inspect(target)} with args=`, args);
        }
    }
}

@LogClassCreate
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
    }

    area() { return this.width * this.height; }
}

@LogClassCreate
class Circle {
    diameter: number;
    constructor(diameter: number) {
        this.diameter = diameter;
    }

    area() { return ((this.diameter / 2) ** 2) * (Math.PI); }
}

const rect1 = new Rectangle(3, 5);
console.log(`area rect1 ${rect1.area()}`);

const rect2 = new Rectangle(5, 8);
console.log(`area rect2 ${rect2.area()}`);

const rect3 = new Rectangle(8, 13);
console.log(`area rect3 ${rect3.area()}`);

const circ1 = new Circle(20);
console.log(`area circ1 ${circ1.area()}`);