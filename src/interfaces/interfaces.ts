import {datable} from '../types/types'

interface SortOption {
  desc?: boolean;
  nullable?: boolean;
}

interface SortByStringOption extends SortOption {
  lowercase?: boolean
}

interface SortByDateOption extends SortOption {
  customParser?: (item: datable) => Date;
}

export {SortOption, SortByStringOption, SortByDateOption};
