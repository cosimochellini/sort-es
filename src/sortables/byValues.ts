import {sortable} from "../types/types";

type SortableObject<T, K extends T> = {
  [key in keyof K]?: sortable<K[key]>;
};

const byValues = <T, K extends T>(obj: SortableObject<T, K>): sortable<K> => {
  return (first: K, second: K): number => {
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

      const sortableFn = obj[key];
      const sortResult = sortableFn(first[key], second[key]);

      if (sortResult !== 0) return sortResult;
    }
    return 0;
  };
};

export default byValues;
