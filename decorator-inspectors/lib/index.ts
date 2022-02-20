
export {
    ClassInspector, LogClassInspector
} from './ClassInspector.js';

export {
    AccessorInspector, LogAccessorInspector,
    AccessorSpy
} from './AccessorInspector.js';

export {
    PropertyInspector, LogPropertyInspector,
    // PropertySpy
} from './PropertyInspector.js';

export {
    MethodInspector, LogMethodInspector
} from './MethodInspector.js';

export {
    ParameterInspector, LogParameterInspector
} from './ParameterInspector.js';


const isset = (val) => {
    return typeof val !== 'undefined' && val !== null;
};
const notset = (val) => {
    return (typeof val === 'undefined') || (val === null);
};

export const isClassDecorator = (target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    return (isset(target)
         && notset(propertyKey)
         && notset(descriptor));
};

export const isPropertyDecorator = (target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    return (isset(target)
         && isset(propertyKey)
         && notset(descriptor));
};

export const isParameterDecorator = (target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    return (isset(target)
         && isset(propertyKey)
         && isset(descriptor)
         && typeof descriptor === 'number');
};

export const isMethodDecorator = (target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    if ((isset(target)
     && isset(propertyKey)
     && isset(descriptor)
     && typeof descriptor === 'object')) {
        const propdesc = <PropertyDescriptor>descriptor;
        return (typeof propdesc.value === 'function');
    } else {
        return false;
    }
}

export const isAccessorDecorator = (target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor) => {

    if ((isset(target)
     && isset(propertyKey)
     && isset(descriptor)
     && typeof descriptor === 'object')) {
        const propdesc = <PropertyDescriptor>descriptor;
        return (typeof propdesc.value !== 'function')
         && (typeof propdesc.get === 'function'
          || typeof propdesc.set === 'function');
    } else {
        return false;
    }
}
