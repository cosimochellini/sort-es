import {getSorter} from "../sort";
import {SortOption} from "../interfaces/interfaces";
import {sortable, sortableWithOption} from "../types/types";

/**
 * the sortable for the boolean values
 * @param options sortable options for byBoolean
 *
 * {@link https://sort-es.netlify.app/by-boolean byBoolean docs}
 * @version 1.3.0
 */
const byBoolean: sortableWithOption<boolean, SortOption> = (
    options: SortOption = {desc: false}
): sortable<boolean> => {
    const sorter = getSorter(options);

    return (first, second) =>
        sorter(Number(second || false) - Number(first || false));
};

export default byBoolean;
