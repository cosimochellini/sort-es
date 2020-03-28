type sortable<T> = (first: T, second: T) => number;

type sortableWithOption<T, TOption> = (options?: TOption) => sortable<T>;

type datable = Date | number | string;

type SortableObject<T> = {
  [key in keyof T]?: sortable<T[key]>;
};

export {sortable, sortableWithOption, datable, SortableObject};
