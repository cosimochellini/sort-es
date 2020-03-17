import sort from "../sort";
import {SortOption} from "../interfaces/interfaces";
import {sortable, sortableWithOption} from "../types/types";

const byStringLowerCase: sortableWithOption<string, SortOption> = (
  options: SortOption = {desc: false, nullable: false}
): sortable<string> => {
  return (first: string, second: string): number =>
    options.nullable ?
      sort((first || '').toLowerCase().localeCompare((second || '').toLowerCase()), options) :
      sort(first.toLowerCase().localeCompare(second.toLowerCase()), options);
};

export default byStringLowerCase;
