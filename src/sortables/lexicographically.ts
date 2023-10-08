import { sortable } from "../types/types";

/**
 * the sortable to sort **sequences** lexicographically
 *
 * The values `null` and `undefined` are treated as empty sequences.
 *
 * @param sortFn the sortable to be applied corresponding items in each sequence
 */
function lexicographically<T>(sortFn: sortable<T>): sortable<Iterable<T>> {
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
        return -1;
      }
      if (rightDone) {
        return 1;
      }
      const v = sortFn(leftValue, rightValue);
      if (v !== 0) {
        return v;
      }
    }
  };
}

export default lexicographically;
