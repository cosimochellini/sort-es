import { sortable } from "../types/types";
import { SortOption } from "../interfaces/interfaces";
import { byDate, byNumber, byString } from "../index";
import { isNumber, isString, isDate } from '../tools';

const byAny = <T extends string | number | Date>(options: SortOption = { desc: false }): sortable<T> => {
  return (first: T, second: T): number => {
    if (isNumber(first) && isNumber(second))
      return byNumber(options)(first, second);

    if (isString(first) && isString(second))
      return byString(options)(first, second);

    if (isDate(first) && isDate(second))
      return byDate(options)(first, second);

    throw new Error("incorrect types of the 2 parameters");
  };
};

export default byAny;
