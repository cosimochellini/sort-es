import {datable} from '../types/types'

interface SortOption {
  desc?: boolean;
  nullable?: boolean;
}

interface SortByDateOption {
  desc?: boolean;
  nullable?: boolean;
  customParser?: (item: datable) => Date;
}

export {SortOption, SortByDateOption};
