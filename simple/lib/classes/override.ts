
function Override<T extends { new(...args: any[]): {}}>(target: T) {
    return class extends target {
        area(w: number, h: number) {
            return {
                w, h, area: w * h
            };
        }
    }
}

@Override
class Overridden {

    area(w: number, h: number) {
        return w * h;
    }
}

console.log(new Overridden().area(5, 6));
console.log(new Overridden().area(6, 7));
