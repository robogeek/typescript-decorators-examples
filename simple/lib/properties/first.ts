
import * as inspectors from 'decorator-inspectors';

function logProperty(target: Object, member: string): any {
    console.log(`PropertyExample logProperty ${target} ${member}`);
}

class PropertyExample {

    @inspectors.LogPropertyInspector
    @logProperty
    name: string;
}

const pe = new PropertyExample();
if (!pe.hasOwnProperty('name')) {
    console.log(`No property 'name' on pe`);
}
console.log(Object.keys(pe));
pe.name = "Stanley Steamer";
if (!pe.hasOwnProperty('name')) {
    console.log(`No property 'name' on pe`);
}

console.log(pe);