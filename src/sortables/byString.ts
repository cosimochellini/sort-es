import sort from "../sort";
import {SortOption} from "../interfaces/interfaces";
import {sortable, sortableWithOption} from "../types/types";

const byString: sortableWithOption<string, SortOption> = (
  options: SortOption = {desc: false, nullable: false}
): sortable<string> => {
  return (first: string, second: string): number =>
    options.nullable ?
      sort((first || '').localeCompare(second || ''), options) :
      sort(first.localeCompare(second), options);
};

export default byString;
