import sort from "../sort";
import { sortByDateOption } from "../interfaces/interfaces";
import { sortableWithOption, sortable } from "../types/types";

const byDate: sortableWithOption<Date | string> = (
  options: sortByDateOption = { desc: false }
): sortable<Date | string> => {
  return (first: Date | string, second: Date | string) => {
    if (typeof first === "string")
      first = options.customParser(first) ?? new Date(first);

    if (typeof second === "string")
      second = options.customParser(second) ?? new Date(second);

    return sort(first.getTime() - second.getTime(), options);
  };
};

export default byDate;
