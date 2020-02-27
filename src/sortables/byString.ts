import sort from "../sort";
import { SortOption } from "../interfaces/interfaces";
import { sortableWithOption, sortable } from "../types/types";

const byString: sortableWithOption<string, SortOption> = (
  options: SortOption = { desc: false }
): sortable<string> => {
  return (first: string, second: string): number =>
    sort(first.localeCompare(second), options);
};

export default byString;
