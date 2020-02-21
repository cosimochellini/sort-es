import sort from "../sort";
import { sortOption } from "../interfaces/interfaces";
import { sortableWithOption, sortable } from "../types/types";

const byString: sortableWithOption<string> = (
  options: sortOption = { desc: false }
): sortable<string> => {
  return (first: string, second: string) =>
    sort(first.localeCompare(second), options);
};

export default byString;
