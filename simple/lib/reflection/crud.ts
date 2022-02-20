
const example = {
    prop1: "property1",
    prop2: 42
};

console.log({
    ownKeys: Reflect.ownKeys(example),
    keys: Object.keys(example)
});

console.log('prop1', Reflect.get(example, 'prop1'));
console.log('prop2', Reflect.get(example, 'prop2'));
console.log(example);

Reflect.defineProperty(example, 'prop3', {
    value: "Property #3",
    enumerable: true,
    writable: true,
    configurable: true
});

console.log({
    ownKeys: Reflect.ownKeys(example),
    keys: Object.keys(example)
});

console.log('prop3', Reflect.get(example, 'prop3'));
console.log(example);

console.log(Object.getOwnPropertyDescriptors(example));

example['prop3'] = 'NEW AND IMPROVED Property #3';

console.log('prop3', Reflect.get(example, 'prop3'));
console.log(example);

Reflect.set(example, 'prop3', 'ULTIMATELY IMPROVED Property #3');

console.log('prop3', Reflect.get(example, 'prop3'));
console.log(example);


// console.log(Reflect.deleteProperty(example, 'prop3'));
delete example['prop3'];
// console.log(Reflect.deleteProperty(example, 'prop1'));
delete example.prop1;

console.log({
    ownKeys: Reflect.ownKeys(example),
    keys: Object.keys(example)
});
console.log(example);

console.log(Object.getOwnPropertyDescriptors(example));
