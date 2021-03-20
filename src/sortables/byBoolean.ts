import sort from "../sort";
import { SortOption } from "../interfaces/interfaces";
import { sortable, sortableWithOption } from "../types/types";

/**
 * the sortable for the boolean values
 * @param options sortable options for byBoolean
 *
 * {@link https://sort-es.netlify.app/by-boolean byBoolean docs}
 * @version 1.3.0
 */
const byBoolean: sortableWithOption<boolean, SortOption> = (
  options: SortOption = { desc: false }
): sortable<boolean> => {
  return (first: boolean, second: boolean): number =>
    sort(Number(second) - Number(first), options);
};

export default byBoolean;
