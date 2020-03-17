import sort from "../sort";
import {SortByDateOption} from "../interfaces/interfaces";
import {datable, sortable, sortableWithOption} from "../types/types";

const parseDate = (parser: (item: datable) => Date, date: datable): Date => {
  if (typeof parser !== "function") return new Date(date);

  return parser(date);
};

const byDate: sortableWithOption<datable, SortByDateOption> = (
  options: SortByDateOption = {desc: false, customParser: null, nullable: false}
): sortable<datable> => {
  return (first: datable, second: datable): number => {
    if (typeof first === "string" || typeof first === "number") {
      first = parseDate(options.customParser, first);
    }

    if (typeof second === "string" || typeof second === "number")
      second = parseDate(options.customParser, second);

    return sort(first.getTime() - second.getTime(), options);
  };
};

export default byDate;
