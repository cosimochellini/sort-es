import {datable} from "../types/types";

export interface SortOption {
    desc?: boolean;
    nullable?: boolean;
}

export interface SortByStringOption extends SortOption {
    lowercase?: boolean;
}

export interface SortByDateOption extends SortOption {
    customParser?: (item: datable) => Date;
}

