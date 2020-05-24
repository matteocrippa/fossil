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
  readonly allowed: Array<any>;
  readonly func?: ValidatorFunction;

  isValid(): Valid {
    // validate type
    switch (this.type) {
      case ValidatorType.string:
        if (typeof this.value !== "string") {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.number:
        if (typeof this.value !== "number") {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.symbol:
        if (typeof this.value !== "symbol") {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.boolean:
        if (this.value !== true && this.value !== false) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.null:
        if (this.value !== null) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.array:
        if (!(this.value instanceof Array)) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.object:
        if (!(this.value instanceof Object)) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.undefined:
        if (this.value !== undefined) {
          return ValidatorError.typeInvalid;
        }
        break;

      case ValidatorType.function:
        const f = this.func as ValidatorFunction;
        if (f !== null && f !== undefined) {
          if (this.allowed.length > 0) {
            return ValidatorError.functionValueNotAllowd;
          }
          if (!f(this.value)) {
            return ValidatorError.functionFailed;
          }
        } else {
          return ValidatorError.typeInvalid;
        }
        break;
    }

    // validate values
    if (this.allowed.length > 0) {
      let hasValue = false;
      this.allowed.forEach((v) => {
        if (this.type === ValidatorType.array) {
          const a = this.value as Array<unknown>;
          const b = v as Array<unknown>;
          const check = (a.length === b.length) &&
            (a.every((el) => b.includes(el)));
          if (check) {
            hasValue = true;
            return;
          }
        } else if (this.type === ValidatorType.object) {
          const a = this.value as Object;
          const b = v as Object;
          const check = (JSON.stringify(a) === JSON.stringify(b));
          if (check) {
            hasValue = true;
            return;
          }
        } else if (v === this.value) {
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
    value: any,
    type: ValidatorType,
    allowed: Array<any> = [],
    func?: ValidatorFunction,
  ) {
    this.value = value;
    this.type = type;
    this.allowed = allowed;
    this.func = func;
  }
}
