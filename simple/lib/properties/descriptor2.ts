
function ValidRange(min: number, max: number) {
    return (target: Object, member: string) => {
        console.log(`Installing ValidRange on ${member}`);
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
    @ValidRange(1900, 2050)
    year: number;
}

const stud = new Student();
const stud2 = new Student();

stud.year = 1901;
console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
stud.year = 2030;
console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
// stud.year = 1899;
// console.log(stud.year);

console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
stud2.year = 2022;
console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
stud2.year = 2023;
console.log(`stud1 ${stud.year} stud2 ${stud2.year}`);
