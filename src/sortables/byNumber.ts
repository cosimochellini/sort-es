import sort from "../sort";
import { SortOption } from "../interfaces/interfaces";
import { sortableWithOption, sortable } from "../types/types";

const byNumber: sortableWithOption<number> = (
  options: SortOption = { desc: false }
): sortable<number> => {
  return (first: number, second: number): number =>
    sort(first - second, options);
};

export default byNumber;
