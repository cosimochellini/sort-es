import { SortOption } from "src/interfaces/interfaces";
import { sortable } from "../types/types";

/**
 * the sortable to sort **sequences** lexicographically
 *
 * The values `null` and `undefined` are treated as empty sequences.
 *
 * @param sortFn the sortable to be applied corresponding items in each sequence
 * @param options the option to control whether the sort is descending
 */
function lexicographically<T>(
  sortFn: sortable<T>,
  options: Omit<SortOption, "nullable"> = {}
): sortable<Iterable<T>> {
  const { desc = false } = options;
  const sign = desc ? -1 : 1;
  return (
    left: Iterable<T> | null | undefined,
    right: Iterable<T> | null | undefined
  ): number => {
    const leftIter = (left || [])[Symbol.iterator]();
    const rightIter = (right || [])[Symbol.iterator]();
    for (;;) {
      const { done: leftDone, value: leftValue } = leftIter.next();
      const { done: rightDone, value: rightValue } = rightIter.next();
      if (leftDone && rightDone) {
        return 0;
      }
      if (leftDone) {
        return -sign;
      }
      if (rightDone) {
        return sign;
      }
      const v = sortFn(leftValue, rightValue);
      if (v !== 0) {
        return sign * v;
      }
    }
  };
}

export default lexicographically;
