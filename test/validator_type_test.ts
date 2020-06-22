import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.58.0/testing/asserts.ts";
import {
  Validator,
  ValidatorType,
  ValidatorFunction,
  ValidatorError,
} from "../fossil.ts";

Deno.test("Type / String", () => {
  let test = new Validator("dog", ValidatorType.string);
  assertEquals(test.isValid(), true);
  test = new Validator({}, ValidatorType.string);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
  test = new Validator(1, ValidatorType.string);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
});

Deno.test("Type / Number", () => {
  let test = new Validator(1, ValidatorType.number);
  assertEquals(test.isValid(), true);
  test = new Validator("asd", ValidatorType.number);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
});

Deno.test("Type / Array", () => {
  let test = new Validator([], ValidatorType.array);
  assertEquals(test.isValid(), true);
  test = new Validator("asd", ValidatorType.array);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
});

Deno.test("Type / Object", () => {
  let test = new Validator({}, ValidatorType.object);
  assertEquals(test.isValid(), true);
  test = new Validator("asd", ValidatorType.object);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
});

Deno.test("Type / Boolean", () => {
  let test = new Validator(true, ValidatorType.boolean);
  assertEquals(test.isValid(), true);
  test = new Validator(false, ValidatorType.boolean);
  assertEquals(test.isValid(), true);
  test = new Validator("home", ValidatorType.boolean);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
  test = new Validator(0, ValidatorType.boolean);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
  test = new Validator([], ValidatorType.boolean);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
});

Deno.test("Type / Function", () => {
  const ValidateCustom: ValidatorFunction = (value: any): boolean => {
    return value === true;
  };
  let test = new Validator(
    true,
    ValidatorType.function,
    [],
    ValidateCustom,
  );
  assertEquals(test.isValid(), true);
  test = new Validator(
    1,
    ValidatorType.function,
    [],
    ValidateCustom,
  );
  assertEquals(test.isValid(), ValidatorError.functionFailed);
  test = new Validator(
    1,
    ValidatorType.function,
    [],
  );
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
});

Deno.test("Type / Email", () => {
  let test = new Validator("john@doe.it", ValidatorType.email);
  assertEquals(test.isValid(), true);
  test = new Validator("john+disposable@doe.it", ValidatorType.email);
  assertEquals(test.isValid(), true);
  test = new Validator({}, ValidatorType.email);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
  test = new Validator("johndoe.it", ValidatorType.email);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
  test = new Validator("johndoe@it", ValidatorType.email);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.typeInvalid);
});
