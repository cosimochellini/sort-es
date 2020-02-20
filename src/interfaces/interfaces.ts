interface sortOption {
  desc?: boolean;
}

interface sortByDateOption {
  desc?: boolean;
  customParser?: (item: string | number) => Date;
}
