
import * as util from 'util';

// This demonstrates several common failures
// We have a simple decorator function, and have
// tried to use it in places where decorators are
// not allowed

function Decorator() {
    console.log('In Decorator');
}

@Decorator
function decorated() {
    console.log('in decorated');
}

@Decorator
interface XyzzyInterface {
    x: number;
    y: number;
    zzy: number;
}

@Decorator
type XyzzyType = {
    x: number;
    y: number;
    zzy: number;
};

@Decorator()
class FooClass {
    foo: string;
}


function logParameter(target: Object,
    propertyKey: string | symbol,
    parameterIndex: number) {

    console.log(`logParameter ${target} ${util.inspect(target)} ${String(propertyKey)} ${parameterIndex}`);
}

function foo(@logParameter x:number) {

}