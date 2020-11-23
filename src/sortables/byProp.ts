import { sortable } from '../types/types';

const byProp = <T, K extends keyof T>(
  prop: K,
  sortFn: sortable<T[K]>
): sortable<T> => {
  return (first: T, second: T): number => {
    const firstItem: T[K] = first[prop];
    const secondItem: T[K] = second[prop];

    return sortFn(firstItem, secondItem);
  };
}

export default byProp;