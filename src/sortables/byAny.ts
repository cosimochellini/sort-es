import { sortable } from "../types/types";
import { SortOption } from "../interfaces/interfaces";
import { byDate, byNumber, byString } from "../index";

function isNumber(v: unknown): v is number {
  return typeof v === "number";
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isDate(v: unknown): v is Date {
  return v instanceof Date;
}

const byAny = <T extends string | number | Date>(
  options: SortOption = { desc: false }
): sortable<T> => {
  return (first: T, second: T): number => {
    if (isNumber(first) && isNumber(second))
      return byNumber(options)(first, second);

    if (isString(first) && isString(second))
      return byString(options)(first, second);

    if (isDate(first) && isDate(second)) return byDate(options)(first, second);

    throw new Error("incorrect types of the 2 parameters");
  };
};

export default byAny;
