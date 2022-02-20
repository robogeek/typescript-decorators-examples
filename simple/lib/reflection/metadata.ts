
import 'reflect-metadata';

class MetadataExample {
    prop1: string = 'prop1';
    prop2: number = 42;
}

const example2 = new MetadataExample();

console.log({
    ownMetadataKeys: Reflect.getOwnMetadataKeys(example2),
    metadataKeys: Reflect.getMetadataKeys(example2)
});

Reflect.defineMetadata('metaProp1', 'prop1', example2);

console.log({
    ownMetadataKeys: Reflect.getOwnMetadataKeys(example2),
    metadataKeys: Reflect.getMetadataKeys(example2)
});

Reflect.defineMetadata('metaKey1ForProp1', 'data stored in prop1',
        example2, 'prop1');

console.log({
    prop1OwnMetadataKeys: Reflect.getOwnMetadataKeys(example2, 'prop1'),
    prop1MetadataKeys: Reflect.getMetadataKeys(example2, 'prop1')
});

console.log({
    hasMetadata: Reflect.hasMetadata('metaProp1', example2),
    hasOwnMetadata: Reflect.hasOwnMetadata('metaProp1', example2),
    prop1NotHasMetadata: Reflect.hasMetadata('metaProp1', example2, 'prop1'),
    prop1NotHasOwnMetadata: Reflect.hasOwnMetadata('metaProp1', example2, 'prop1'),
    prop1HasMetadata: Reflect.hasMetadata('metaKey1ForProp1', example2, 'prop1'),
    prop1HasOwnMetadata: Reflect.hasOwnMetadata('metaKey1ForProp1', example2, 'prop1'),
});

console.log({
    metadata: Reflect.getMetadata('metaProp1', example2),
    ownMetadata: Reflect.getOwnMetadata('metaProp1', example2),
    prop1NotMetadata: Reflect.getMetadata('metaProp1', example2, 'prop1'),
    prop1NotOwnMetadata: Reflect.getOwnMetadata('metaProp1', example2, 'prop1'),
    prop1Metadata: Reflect.getMetadata('metaKey1ForProp1', example2, 'prop1'),
    prop1OwnMetadata: Reflect.getOwnMetadata('metaKey1ForProp1', example2, 'prop1'),
});


Reflect.defineMetadata('metaProp1', 'NEW IMPROVED prop1', example2);
Reflect.defineMetadata('metaKey1ForProp1', 'NEW IMPROVED prop1 on prop1', example2, 'prop1');

console.log({
    metadata: Reflect.getMetadata('metaProp1', example2),
    ownMetadata: Reflect.getOwnMetadata('metaProp1', example2),
    prop1NotMetadata: Reflect.getMetadata('metaProp1', example2, 'prop1'),
    prop1NotOwnMetadata: Reflect.getOwnMetadata('metaProp1', example2, 'prop1'),
    prop1Metadata: Reflect.getMetadata('metaKey1ForProp1', example2, 'prop1'),
    prop1OwnMetadata: Reflect.getOwnMetadata('metaKey1ForProp1', example2, 'prop1'),
});

Reflect.deleteMetadata('metaProp1', example2);
Reflect.deleteMetadata('metaKey1ForProp1', example2, 'prop1');

console.log({
    metadata: Reflect.getMetadata('metaProp1', example2),
    ownMetadata: Reflect.getOwnMetadata('metaProp1', example2),
    prop1NotMetadata: Reflect.getMetadata('metaProp1', example2, 'prop1'),
    prop1NotOwnMetadata: Reflect.getOwnMetadata('metaProp1', example2, 'prop1'),
    prop1Metadata: Reflect.getMetadata('metaKey1ForProp1', example2, 'prop1'),
    prop1OwnMetadata: Reflect.getOwnMetadata('metaKey1ForProp1', example2, 'prop1'),
});
