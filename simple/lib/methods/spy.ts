
function MethodSpy(target: Object,
    propertyKey: string, descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`MethodSpy before ${propertyKey}`, args);
        const result = originalMethod.apply(this, args);
        console.log(`MethodSpy after ${propertyKey}`, result);
        return result;
    }
}

class SpiedOn {

    @MethodSpy
    area(width: number, height: number) {
        return width * height;
    }

    @MethodSpy
    areaCircle(diameter: number) {
        return Math.PI * ((diameter / 2) ** 2);
    }
}

const spyon = new SpiedOn();

console.log(spyon.area(6, 10));
console.log(spyon.area(16, 20));

console.log(spyon.areaCircle(10));
console.log(spyon.areaCircle(20));
