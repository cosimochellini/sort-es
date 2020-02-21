import { sortOption } from "../interfaces/interfaces";

type sortable<T> = (first: T, second: T) => number;

type sortableWithOption<T> = (options?: sortOption) => sortable<T>;

export { sortable, sortableWithOption };
