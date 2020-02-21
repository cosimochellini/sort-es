import sort from "../sort";
import { sortOption } from "../interfaces/interfaces";
import { sortableWithOption, sortable } from "../types/types";

const byNumber: sortableWithOption<number> = (
  options: sortOption = { desc: false }
): sortable<number> => {
  return (first: number, second: number) => sort(first - second, options);
};

export default byNumber;
