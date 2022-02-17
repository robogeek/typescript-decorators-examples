import * as inspectors from 'decorator-inspectors';

function logProperty(target: Object, member: string): any {
    console.log(`PropertyExample logProperty ${target} ${member}`);
}

function GetDescriptor() {
    return (target: Object, member: string) => {
        const prop = Object.getOwnPropertyDescriptor(target, member);
        console.log(`Property ${member} ${prop}`);
    };
}

class Student {

    @GetDescriptor()
    year: number;

}

const stud1 = new Student();
console.log(Object.getOwnPropertyDescriptor(stud1, 'year'));
stud1.year = 2022;
console.log(Object.getOwnPropertyDescriptor(stud1, 'year'));
