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
