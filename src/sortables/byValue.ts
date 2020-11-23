import { sortable } from "../types/types";

const byValue = <T, V>(
  valueFn: (item: T) => V,
  sortFn: sortable<V>
): sortable<T> => {
  return (first: T, second: T): number => {
    const firstItem: V = valueFn(first);
    const secondItem: V = valueFn(second);

    return sortFn(firstItem, secondItem);
  };
};

export default byValue;
