import { sortable } from "../types/types";

function byValue<T, K extends keyof T>(
  discriminator: K,
  sortFn: sortable<T[K]>
): sortable<T>;

function byValue<T, TReturn>(
  discriminator: (item: T) => TReturn,
  sortFn: sortable<TReturn>
): sortable<T>;

function byValue<T, K extends keyof T, TResult>(
  discriminator: K | ((item: T) => TResult),
  sortFn: sortable<T[K]> | sortable<TResult>
): sortable<T> {
  if (typeof discriminator === "function") {
    return (first: T, second: T): number => {
      const firstItem: TResult = discriminator(first);

      const secondItem: TResult = discriminator(second);

      return (sortFn as sortable<TResult>)(firstItem, secondItem);
    };
  }

  return (first: T, second: T): number => {
    const firstItem: T[K] = first[discriminator];

    const secondItem: T[K] = second[discriminator];

    return (sortFn as sortable<T[K]>)(firstItem, secondItem);
  };
}

export default byValue;
