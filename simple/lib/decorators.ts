
export function logSimpleDecorator() {
    console.log(`logSimpleDecorator`);
}


function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

