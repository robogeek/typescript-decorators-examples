
function Validate<T>(validator: Function) {
    return (target: Object, propertyKey: string,
        descriptor: PropertyDescriptor) => {
        
        const originals = {
            get: descriptor.get,
            set: descriptor.set
        };
        if (originals.set) {
            descriptor.set = function(newval: T) {
                console.log(`Validate set ${String(propertyKey)}`, newval);
                if (validator) {
                    if (!validator(newval)) {
                        throw new Error(`Invalid value for ${propertyKey} -- ${newval}`);
                    }
                }
                originals.set.call(this, newval);
            };
        }
    }
}


class CarSeen {

    #speed: number;

    @Validate<number>((speed: number) => {
        console.log(`Validate speed ${speed}`);
        if (typeof speed !== 'number') return false;
        if (speed < 10 || speed > 65) return false;
        return true;
    })
    set speed(speed) {
        console.log(`set speed ${speed}`);
        this.#speed = speed; }
    get speed() { return this.#speed; }

}

const cs1 = new CarSeen();
cs1.speed = 22;
console.log(cs1.speed);

cs1.speed = 33;
console.log(cs1.speed);

cs1.speed = 44;
console.log(cs1.speed);

cs1.speed = 55;
console.log(cs1.speed);

cs1.speed = 66;
console.log(cs1.speed);

