import { sortable, SortableTuple, SortableObject } from "../types/types";

/**
 * the sortable that allow you to sort an array of **complex object** by multiple properties
 * @param sorter the array to determine the strategy to sort the elements
 *
 * {@link https://sort-es.netlify.app/by-values byValues docs}
 * @version 1.2.0
 */
function byValues<T>(sorter: SortableTuple<T>[]): sortable<T>;

/**
 * the sortable that allow you to sort an array of **complex object** by multiple properties
 * @deprecated do not pass the sorter for the byValue as object, use the `sorter: SortableTuple<T>[]`
 * {@link https://sort-es.netlify.app/by-values byValues docs}
 * @version 1.0.0
 */
function byValues<T>(sorter: SortableObject<T>): sortable<T>;

function byValues<T>(
  sorter: SortableObject<T> | SortableTuple<T>[]
): sortable<T> {
  if (Array.isArray(sorter)) {
    return (first: T, second: T): number => {
      for (const [prop, sortableFn] of sorter) {
        if (!sortableFn) continue;
        const sortResult = sortableFn(first[prop], second[prop]);

        if (sortResult !== 0) return sortResult;
      }
      return 0;
    };
  }
  return (first: T, second: T): number => {
    console.warn(
      "do not pass the sorter for the byValue as object, use the array syntax"
    );
    console.warn("this option will be removed in the next major release");
    for (const key in sorter) {
      if (!Object.prototype.hasOwnProperty.call(sorter, key)) continue;

      const sortableFn = sorter[key];

      if (!sortableFn) continue;

      const sortResult = sortableFn(first[key], second[key]);

      if (sortResult !== 0) return sortResult;
    }
    return 0;
  };
}

export default byValues;
