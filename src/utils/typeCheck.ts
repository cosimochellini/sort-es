export function isNumber(v: unknown): v is number {
  return typeof v === "number";
}

export function isString(v: unknown): v is string {
  return typeof v === "string";
}

export function isDate(v: unknown): v is Date {
  return v instanceof Date;
}

export function isFunction(v: unknown): v is FunctionConstructor {
  return typeof v === "function";
}
