type sortable<T> = (first: T, second: T) => number;

type sortableWithOption<T, TOption> = (options?: TOption) => sortable<T>;

type datable = Date | number | string;

type SortableObject<T, K extends T> = {
  [key in keyof K]?: sortable<K[key]>;
};

type Nullable<T> = T | null;

export {sortable, sortableWithOption, datable, SortableObject, Nullable};
