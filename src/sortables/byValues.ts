import { sortable, SortableObject } from "../types/types";

const byValues = <T>(sorter: SortableObject<T>): sortable<T> => {
  return (first: T, second: T): number => {
    for (const key in sorter) {
      if (!Object.prototype.hasOwnProperty.call(sorter, key)) continue;

      const sortableFn = sorter[key];

      if (!sortableFn) continue;

      const sortResult = sortableFn(first[key], second[key]);

      if (sortResult !== 0) return sortResult;
    }
    return 0;
  };
};

export default byValues;
