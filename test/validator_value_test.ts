import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.51.0/testing/asserts.ts";
import {
  Validator,
  ValidatorType,
  ValidatorFunction,
  ValidatorError,
} from "../fossil.ts";

Deno.test("Value / String", () => {
  let test = new Validator(
    "dog",
    ValidatorType.string,
    ["dog", "bird", "lion"],
  );
  assertEquals(test.isValid(), true);
  test = new Validator("dog", ValidatorType.string, ["cat"]);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.valueInvalid);
});

Deno.test("Value / Number", () => {
  let test = new Validator(1, ValidatorType.number, [1, 2, 3, 4, 5]);
  assertEquals(test.isValid(), true);
  test = new Validator(1, ValidatorType.number, [2, 3, 4, 5, 6]);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.valueInvalid);
});

Deno.test("Value / Array", () => {
  let test = new Validator([], ValidatorType.array, [[]]);
  assertEquals(test.isValid(), true);
  test = new Validator([1], ValidatorType.array, [[]]);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.valueInvalid);
});

Deno.test("Value / Object", () => {
  let test = new Validator({}, ValidatorType.object, [{}]);
  assertEquals(test.isValid(), true);
  test = new Validator({ animal: "dog" }, ValidatorType.object, [{}]);
  assertNotEquals(test.isValid(), true);
  assertEquals(test.isValid(), ValidatorError.valueInvalid);
});

Deno.test("Value / Boolean", () => {
  let test = new Validator(true, ValidatorType.boolean, [true]);
  assertEquals(test.isValid(), true);
  test = new Validator(false, ValidatorType.boolean, [true]);
  assertEquals(test.isValid(), ValidatorError.valueInvalid);
});

Deno.test("Value / Function", () => {
  const ValidateCustom: ValidatorFunction = (value: any): boolean => {
    return value === true;
  };
  let test = new Validator(
    true,
    ValidatorType.function,
    [1],
    ValidateCustom,
  );
  assertEquals(test.isValid(), ValidatorError.functionValueNotAllowd);
});
