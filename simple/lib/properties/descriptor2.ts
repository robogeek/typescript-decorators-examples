
function ValidRange(min: number, max: number) {
    return (target: Object, member: string) => {
        console.log(`Installing ValidRange on ${member}`);
        let value: number;
        Object.defineProperty(target, member, {
            enumerable: true,
            get: function() {
                console.log("Inside ValidRange get");
                return value;
            },
            set: function(v: number) {
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
    @ValidRange(1900, 2050)
    year: number;

    @ValidRange(0, 150)
    age: number;
}

const stud = new Student();
const stud2 = new Student();
const stud3 = new Student();

stud.year = 1901;
stud2.year = 1911;
stud.age = 20;
console.log(`stud1 ${stud.year} ${stud.age} stud2 ${stud2.year} ${stud2.age}`);
console.log(`stud3 ${stud3.year} ${stud3.age}`);
stud.year = 2030;
console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
// stud.year = 1899;
// console.log(stud.year);

console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
stud2.year = 2022;
console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
stud2.year = 2023;
console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
