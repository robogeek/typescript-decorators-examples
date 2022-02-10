import 'reflect-metadata';
import * as util from 'util';
import * as inspectors from 'decorator-inspectors';

function logParameter(target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) {

    console.log(`logParameter ${target} ${util.inspect(target)} ${String(propertyKey)} ${parameterIndex}`);
}

function logFactory() {
    return (target: Object,
        propertyKey: string | symbol,
        parameterIndex: number) => {

        console.log(`logFactory ${target} ${util.inspect(target)} ${String(propertyKey)} ${parameterIndex}`);
    }
}

class ParameterExample {

    member(
        @inspectors.LogParameterInspector
        x: number,
        @inspectors.LogParameterInspector
        y: number) {
        console.log(`member ${x} ${y}`);
    }
}

const pex = new ParameterExample();
pex.member(2, 3);
pex.member(3, 5);
pex.member(5, 8);

