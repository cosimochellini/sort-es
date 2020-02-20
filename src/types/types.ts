
type sortable<T> = (first: T, second: T) => number;

type sortableWithOption<T> = (options?: sortOption) => sortable<T>;
