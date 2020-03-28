import {sortable, SortableObject} from "../types/types";

const byValues = <T>(obj: SortableObject<T>): sortable<T> => {
  return (first: T, second: T): number => {
    for (const key in obj) {

      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

      const sortableFn = obj[key];

      if (!sortableFn) continue;

      const sortResult = sortableFn(first[key], second[key]);

      if (sortResult !== 0) return sortResult;
    }
    return 0;
  };
};

export default byValues;
