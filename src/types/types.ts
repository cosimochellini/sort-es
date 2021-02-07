type sortable<T> = (first: T, second: T) => number;

type sortableWithOption<T, TOption> = (options?: TOption) => sortable<T>;

type datable = Date | number | string;

type SortableObject<T> = {
  [key in keyof T]?: sortable<T[key]>;
};

type SortableTuple<T> = keyof T extends infer TKey
  ? TKey extends keyof T
    ? [TKey, sortable<T[TKey]>]
    : never
  : never;

export { sortable, sortableWithOption, datable, SortableObject, SortableTuple };
