import { sortable } from "src/types/types";

const getFirstAndLast = <T>(array: T[]): [T, T] => {
  const { 0: first, [array.length - 1]: last } = array;
  return [first, last];
};

const reverse = <T>(array: T[]): T[] => array.concat().reverse();

function isSorted<T>(data: readonly T[], cmp: sortable<T>): boolean {
  for (let i = 1; i < data.length; i++) {
    if (cmp(data[i - 1], data[i]) > 0) {
      return false;
    }
  }
  return true;
}

/**
 * A sorting function without the quirks of `Array.sort`.  In particular, it
 * doesn't treat `undefined` specially.
 */
function sort<T>(data: readonly T[], cmp: sortable<T>): T[] {
  if (data.length <= 1) {
    return Array.from(data);
  }
  const [head, ...tail] = data;
  const before = tail.filter((x) => cmp(x, head) < 0);
  const after = tail.filter((x) => cmp(x, head) >= 0);
  return [...sort(before, cmp), head, ...sort(after, cmp)];
}

const naiveNumberCompare: sortable<number> = (x, y) => x! - y!;

export { getFirstAndLast, reverse, isSorted, sort, naiveNumberCompare };
