import { sortable } from "../types/types";

/**
 * the sortable to sort a specific property (or **function that return a value**) of a **complex object or class**.
 * @param discriminator the property to be sorted
 * @param sortFn the sortable to be applied to the property
 *
 * {@link https://sort-es.netlify.app/by-value byValue docs}
 * @version 1.0.0
 */
function byValue<T, K extends keyof T>(
  discriminator: K,
  sortFn: sortable<NonNullable<T[K]>>
): sortable<T>;

/**
 * the sortable to sort a specific property (or **function that return a value**) of a **complex object or class**.
 * @param discriminator the function that return the property
 * @param sortFn the sortable to be applied to the property
 *
 * {@link https://sort-es.netlify.app/by-value byValue docs}
 * @version 1.0.0
 */
function byValue<T, TReturn>(
  discriminator: (item: T) => TReturn,
  sortFn: sortable<NonNullable<TReturn>>
): sortable<T>;

function byValue<T, K extends keyof T, TResult>(
  discriminator: K | ((item: T) => TResult),
  sortFn: sortable<T[K]> | sortable<TResult>
): sortable<T> {
  if (typeof discriminator === "function") {
    return (first, second) => {
      const firstItem: TResult = discriminator(first!);

      const secondItem: TResult = discriminator(second!);

      return (sortFn as sortable<TResult>)(firstItem, secondItem);
    };
  }

  return (first, second) => {
    const firstItem: T[K] = first![discriminator];

    const secondItem: T[K] = second![discriminator];

    return (sortFn as sortable<T[K]>)(firstItem, secondItem);
  };
}

export default byValue;
