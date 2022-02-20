The `decorator-inspectors` package contain TypeScript decorators which let you print out detailed information about decorated objects.  These decorators were developed in conjunction with writing an article series, [Deep introduction to TypeScript decorators, metadata, and runtime data validation with decorators](https://techsparx.com/nodejs/typescript/decorators/introduction.html), which is a deep look into using and implementing TypeScript decorators.

The primary use for this package is when developing decorators.  The inspectors help you to see the data you can get ahold of via the decorators.

# INSTALLATION

To install this package: `npm install decorator-inspectors --save` (or the `yarn` equivalent)

# USAGE

To use this package in your application:

```ts
import * as inspectors from 'decorator-inspectors';
```

You then use the decorators as `@inspectors.DecoratorName`.

To see examples visit the repository at https://github.com/robogeek/typescript-decorators-examples

# API: Functions

The `decorator-inspectors` package provides five functions which can be used inside a hybrid decorator to determine the context it is being used in.  It is observed that based on the types for the decorator parameters, one can determine the sort of object to which the decorator has been attached.  This makes it possible to create a hybrid decorator which can be attached to any object.

The method signature for the hybrid decorator function is:

```ts
(target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor)
```

This signature handles every variant of parameters for decorator functions.

There is an example of using these functions in the repository, in the `simple/lib/hybrid` directory.

```ts
isClassDecorator(target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor);
```

Type Guard that detects whether the decorator is attached to a class definition.

```ts
isPropertyDecorator(target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor);
```

Type Guard that detects whether the decorator is attached to a property definition.

```ts
isParameterDecorator(target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor);
```

Type Guard that detects whether the decorator is attached to a method parameter.

```ts
isMethodDecorator(target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor);
```

Type Guard that detects whether the decorator is attached to a method definition.

```ts
isAccessorDecorator(target: Object,
    propertyKey?: string | symbol,
    descriptor?: number | PropertyDescriptor);
```

Type Guard that detects whether the decorator is attached to a accessor definition.


# API: Decorators

```js
@inspectors.LogClassInspector
class ClassName { .. }
```

This prints detailed information about the class, at class construction time.  It is not printed when class instances are created.

```js
const data = @inspectors.ClassInspector(ClassName)
```

This function can be called in regular code to gather the same data shown using the `@LogClassInspector`.

```js
class ClassName {
    @inspectors.LogAccessorInspector
    get accessor() { .. }
    set accessor(val: type) { .. }
}
```

This prints data about the accessor, including its PropertyDescriptor object.

```js
const data = @inspectors.AccessorInspector(ClassName)
```

This function can be called in regular code to gather the same data shown using the `@LogAccessorInspector`.


```js
class ClassName {
    @inspectors.AccessorSpy<type>()
    get accessor() { .. }
    set accessor(val: type) { .. }
}
```

This prints data for every invocation of `get` or `set` on the accessor.  The _type_ passed through the Generic must match the type for the accessor.

```js
class ClassName {
    @inspectors.LogPropertyInspector
    propertyName: type;
}
```

This prints data about the property.  There is no PropertyDescriptor available through this decorator.

```js
const data = @inspectors.PropertyInspector(ClassName)
```

This function can be called in regular code to gather the same data shown using the `@LogPropertyInspector`.


```js
class ClassName {
    @inspectors.LogMethodInspector
    methodName() { ... }
}
```

This prints data about the method, including its PropertyDescriptor object.

```js
const data = @inspectors.MethodInspector(ClassName)
```

This function can be called in regular code to gather the same data shown using the `@LogMethodInspector`.


```js
class ClassName {
    methodName(
        @inspectors.LogParameterInspector
        param1: type,
        @inspectors.LogParameterInspector
        param2: type) { ... }
}
```

This prints data about the parameter.

```js
const data = @inspectors.ParameterInspector(ClassName)
```

This function can be called in regular code to gather the same data shown using the `@LogParameterInspector`.
