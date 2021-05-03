import { getSorter } from "../sort";
import { SortByDateOption } from "../interfaces/interfaces";
import { isFunction, isNumber, isString } from "../utils/typeCheck";
import { datable, sortable, sortableWithOption } from "../types/types";

const parseDate = (parser: (item: datable) => Date, date: datable): Date => {
  if (!isFunction(parser)) return new Date(date);

  return parser(date);
};

/**
 * the sortable for the date values
 * @param options sortable options for byDate
 *
 * {@link https://sort-es.netlify.app/by-date byDate docs}
 * @version 1.0.0
 */
const byDate: sortableWithOption<datable, SortByDateOption> = (
  options: SortByDateOption = {
    desc: false,
    customParser: null,
    nullable: false,
  }
): sortable<datable> => {
  const sorter = getSorter(options);

  return (first: datable, second: datable): number => {
    if (isString(first) || isNumber(first))
      first = parseDate(options.customParser, first);

    if (isString(second) || isNumber(second))
      second = parseDate(options.customParser, second);

    return sorter(first.getTime() - second.getTime());
  };
};

export default byDate;
