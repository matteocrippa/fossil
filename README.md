# ![](https://raw.githubusercontent.com/matteocrippa/fossil/master/.github/footprint.png) fossil

A typescript validation suite for deno projects.

At this _alpha_ stage fossil support validation for the following types:

- [x] String
- [x] Number
- [x] Symbol
- [x] Custom function
- [x] Array
- [x] Object
- [x] Null
- [x] Undefined
- [ ] Email
- [ ] Alphanumeric

A good companion project for `fossil` is [Microraptor](https://github.com/matteocrippa/microraptor) a lightweight framework for easy routing.

## Install

Import _fossil_ in your project with just one line of code:

```ts
import { Validator } from "https://deno.land/x/fossil/fossil.ts";
```

## How to use

### Check type

```ts
let testBoolean = new Validator(true, ValidatorType.boolean);
console.log(testBoolean.isValid()); // true

testBoolean = new Validator("home", ValidatorType.boolean);
console.log(testBoolean.isValid()); // Invalid type
```

### Check type and value

```ts
let testBoolean = new Validator(true, ValidatorType.boolean, [true]);
console.log(testBoolean.isValid()); // true
```

## Extra

_Credits_
Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)
