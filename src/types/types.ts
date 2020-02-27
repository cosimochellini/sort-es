type sortable<T> = (first: T, second: T) => number;

type sortableWithOption<T, TOption> = (options?: TOption) => sortable<T>;

type datable = Date | number | string;

export { sortable, sortableWithOption, datable };
