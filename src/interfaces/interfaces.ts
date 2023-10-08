import {datable} from "../types/types";

export interface SortOption {
    /** 
     * Sort in descending order if true.
     *
     * Using a descending sorter is generally not the same as reversing an array
     * after sorting it, doing so breaks the stability of the sort function, and
     * because `Array.sort` always puts `undefined` last, regardless of the
     * comparator function in use.
     */
    desc?: boolean;

    /**
     * If true, treat `null` or `undefined` like 0, "", etc.  Not all sorters
     * honor this option.
     *
     * This option doesn't always work correctly with `Array.sort`, which always
     * puts `undefined` last.
     */
    nullable?: boolean;
}

export interface SortByStringOption extends SortOption {
    /**
     * If true, puts the strings to lowercase before comparising them.
     */
    lowercase?: boolean;
}

export interface SortByDateOption extends SortOption {
    /**
     * A custom date parser.
     */
    customParser?: (item: datable) => Date;
}

