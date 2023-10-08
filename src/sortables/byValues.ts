import { ByValuesSorter, GenericTuple, sortable } from "../types/types";

/**
 * the sortable that allow you to sort an array of **complex object** by multiple properties
 * @param sorter the array to determine the strategy to sort the elements
 *
 * {@link https://sort-es.netlify.app/by-values byValues docs}
 * @version 1.2.0
 */
export default function byValues<T, TTuple extends GenericTuple<T>[]>(
  sorter: ByValuesSorter<T, TTuple>
): sortable<T> {
  return (first, second) => {
    for (const [prop, sortableFn] of sorter) {
      if (!sortableFn) continue;

      let sortResult: number | undefined;

      if (typeof prop === "function") {
        sortResult = sortableFn(prop(first!), prop(second!));
      } else {
        console.log(
          `you're running a deprecated option, checkout https://sort-es.netlify.app/breaking-changes/ `
        );
        sortResult = sortableFn(first![prop], second![prop]);
      }

      if (sortResult !== 0) return sortResult;
    }
    return 0;
  };
}
