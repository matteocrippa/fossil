export enum ValidatorError {
  typeInvalid = "Invalid type",
  valueInvalid = "Invalid value",
  functionFailed = "Function failed validation",
  functionValueNotAllowd = "Function cannot have allowed values",
}

export type Valid = true | ValidatorError;

export interface ValidatorFunction {
  (value: unknown): boolean;
}

export enum ValidatorType {
  null,
  undefined,
  string,
  number,
  symbol,
  function,
  boolean,
  array,
  object,
  alphanumeric,
  email,
}

export class Validator {
  readonly value: unknown;
  readonly type: ValidatorType;
  readonly allowed: Array<unknown>;
  readonly func?: ValidatorFunction;

  isValid(v?: unknown): Valid {
    let value = this.value;
    if (v) {
      value = v;
    }

    // validate type
    switch (this.type) {
      case ValidatorType.string:
        if (typeof value !== "string") {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.number:
        if (typeof value !== "number") {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.symbol:
        if (typeof value !== "symbol") {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.boolean:
        if (value !== true && value !== false) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.null:
        if (value !== null) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.array:
        if (!(value instanceof Array)) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.object:
        if (!(value instanceof Object)) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.undefined:
        if (value !== undefined) {
          return ValidatorError.typeInvalid;
        }
        break;
      // deno-lint-ignore no-case-declarations
      case ValidatorType.function:
        const f = this.func as ValidatorFunction;
        if (f !== null && f !== undefined) {
          if (this.allowed.length > 0) {
            return ValidatorError.functionValueNotAllowd;
          }
          if (!f(value)) {
            return ValidatorError.functionFailed;
          }
        } else {
          return ValidatorError.typeInvalid;
        }
        break;
      default:
        return ValidatorError.typeInvalid;
    }

    // validate values
    if (this.allowed.length > 0) {
      let hasValue = false;
      this.allowed.forEach((v) => {
        if (this.type === ValidatorType.array) {
          const a = value as Array<unknown>;
          const b = v as Array<unknown>;
          const check = (a.length === b.length) &&
            (a.every((el) => b.includes(el)));
          if (check) {
            hasValue = true;
            return;
          }
        } else if (this.type === ValidatorType.object) {
          const a = value as Object;
          const b = v as Object;
          const check = (JSON.stringify(a) === JSON.stringify(b));
          if (check) {
            hasValue = true;
            return;
          }
        } else if (v === value) {
          hasValue = true;
        }
      });

      if (!hasValue) {
        return ValidatorError.valueInvalid;
      }
    }
    return true;
  }

  constructor(
    value: unknown,
    type: ValidatorType,
    allowed: Array<unknown> = [],
    func?: ValidatorFunction,
  ) {
    this.value = value;
    this.type = type;
    this.allowed = allowed;
    this.func = func;
  }
}
