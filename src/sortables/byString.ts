import sort from "../sort";
import { SortByStringOption } from "../interfaces/interfaces";
import { sortable, sortableWithOption } from "../types/types";

const fixString = (value: string, options: SortByStringOption) => {
  if (options.lowercase) value = value.toLowerCase();

  if (options.nullable) value = value || "";

  return value;
};

const byString: sortableWithOption<string, SortByStringOption> = (
  options: SortByStringOption = {
    desc: false,
    nullable: false,
    lowercase: false,
  }
): sortable<string> => {
  return (first: string, second: string): number => {
    return sort(
      fixString(first, options).localeCompare(fixString(second, options)),
      options
    );
  };
};

export default byString;
