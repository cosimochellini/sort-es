import { getSorter } from "../sort";
import { SortByStringOption } from "../interfaces/interfaces";
import { sortable, sortableWithOption } from "../types/types";

const fixString = (value: string, options: SortByStringOption) => {
  if (options.lowercase) value = value.toLowerCase();

  if (options.nullable) value = value || "";

  return value;
};

/**
 * the sortable to sort the **string primitive**
 * @param options the options to sort the strings correctly
 *
 * {@link https://sort-es.netlify.app/by-string byString docs}
 * @version 1.0.0
 */
const byString: sortableWithOption<string, SortByStringOption> = (
  options: SortByStringOption = {
    desc: false,
    nullable: false,
    lowercase: false,
  }
): sortable<string> => {
  const sorter = getSorter(options);
  return (first: string, second: string): number => {
    return sorter(
      fixString(first, options).localeCompare(fixString(second, options))
    );
  };
};

export default byString;
