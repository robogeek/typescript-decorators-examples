

import 'reflect-metadata';

@Reflect.metadata('decoratedClass', 'value')
class MetadataDecoratorExample {
  // apply metadata via a decorator to a method (property)
  @Reflect.metadata('decoratedMethod', 'method value')
  method(param1?: number, param2?: string): string {
      return 'Hello, World!';
  }
}

const mde = new MetadataDecoratorExample();

console.log({
    classClassKeys: Reflect.getMetadataKeys(MetadataDecoratorExample),
    classClassMetadata: Reflect.getMetadata('decoratedClass', MetadataDecoratorExample),
    classKeys: Reflect.getMetadataKeys(mde),
    ownClassKeys: Reflect.getOwnMetadataKeys(mde),
    methodClassKeys: Reflect.getMetadataKeys(MetadataDecoratorExample, 'method'),
    methodKeys: Reflect.getMetadataKeys(mde, 'method'),
    methodReturn: Reflect.getMetadata('design:returntype', mde, 'method'),
    methodParams: Reflect.getMetadata('design:paramtypes', mde, 'method'),
    methodType: Reflect.getMetadata('design:type', mde, 'method'),
    methodDecorated: Reflect.getMetadata('decoratedMethod', mde, 'method'),
});


