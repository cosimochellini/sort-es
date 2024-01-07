import byDate from "../sortables/byDate";
import { sortable } from "../types/types";
import byNumber from "../sortables/byNumber";
import byString from "../sortables/byString";
import { SortOption } from "../interfaces/interfaces";
import { isDate, isNumber, isString } from "../utils/typeCheck";

/**
 * the sortable that works on **`number`, `string`, and `Date` values**,
 * provided the types are not mixed
 * @param options the options to sort the values
 *
 * {@link https://sort-es.netlify.app/by-default byDefault docs}
 * @version 1.8.0
 */
const byAny = <T extends string | number | Date>(
  options: SortOption = { desc: false }
): sortable<T> => {
  return (first, second) => {
    if (isNumber(first) && isNumber(second))
      return byNumber(options)(first, second);

    if (isString(first) && isString(second))
      return byString(options)(first, second);

    if (isDate(first) && isDate(second)) return byDate(options)(first, second);

    throw new Error("incorrect types of the 2 parameters");
  };
};

export default byAny;
