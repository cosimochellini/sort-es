import { SortOption } from "src/interfaces/interfaces";
import { sortable, sortableWithOption } from "../types/types";

/**
 * the sortable which sorts the same as `Array.sort` with no comparator
 * @param options used to specify whether the sort is descending; the `nullable` setting is ignored
 *
 * {@link https://sort-es.netlify.app/by-default byDefault docs}
 * @version 1.8.0
 */
const byDefault: sortableWithOption<unknown, Omit<SortOption, "nullable">> = ({
  desc = false,
} = {}): sortable<unknown> => {
  const sign = desc ? -1 : 1;
  return (x: unknown, y: unknown): number => {
    if (x === undefined) {
      if (y === undefined) {
        return 0;
      } else {
        return 1;
      }
    }
    if (y === undefined) {
      return -1;
    }
    const xString = String(x);
    const yString = String(y);
    const xSmaller = xString < yString;
    if (xSmaller) {
      return -sign;
    }
    const ySmaller = yString < xString;
    if (ySmaller) {
      return sign;
    }
    return 0;
  };
};

export default byDefault;
