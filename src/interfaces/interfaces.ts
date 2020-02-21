interface SortOption {
  desc?: boolean;
}

interface SortByDateOption {
  desc?: boolean;
  customParser?: (item: string | number) => Date;
}

export { SortOption, SortByDateOption };
