import sort from "../sort";
import {SortOption} from "../interfaces/interfaces";
import {sortable, sortableWithOption} from "../types/types";

const byNumber: sortableWithOption<number, SortOption> = (
  options: SortOption = {desc: false, nullable: false}
): sortable<number> => {
  return (first: number, second: number): number =>
    options.nullable ?
      sort((first || 0) - (second || 0), options) :
      sort(first - second, options);
};

export default byNumber;
