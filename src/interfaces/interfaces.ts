import { datable } from '../types/types'

interface SortOption {
  desc?: boolean;
}

interface SortByDateOption {
  desc?: boolean;
  customParser?: (item: datable) => Date;
}

export { SortOption, SortByDateOption };
