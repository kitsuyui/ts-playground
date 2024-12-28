# @kitsuyui/symbolic-prototype

Using ES6 Symbol to avoid conflict with other libraries and native objects.
In other words it is a modern version of prototype.js.

## Example

```ts
import { SymbolicPrototype } from '@kitsuyui/symbolic-prototype';
const $ = SymbolicPrototype.NumberArray;
const array = [1, 2, 3];
const twice = array[$.scale](2);
console.log(twice); // => [2, 4, 6]
```

## Caution

- I do not recommend using this package. It is just for fun.
- This package is experimental.
- This package is not intended to be used in production.
- Breaking changes may be introduced in the future.

## Install

```sh
npm install @kitsuyui/symbolic-prototype
```

## License

MIT
