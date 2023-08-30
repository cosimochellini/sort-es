import {getSorter} from "../sort";
import {SortByDateOption} from "../interfaces/interfaces";
import {datable, sortable, sortableWithOption} from "../types/types";

const parseDate = (date: datable) => new Date(date);

const parseNullableDate = (date: datable | null | undefined) => new Date(date || 0);

/**
 * the sortable for the date values
 * @param options sortable options for byDate
 *
 * {@link https://sort-es.netlify.app/by-date byDate docs}
 * @version 1.0.0
 */
const byDate: sortableWithOption<datable, SortByDateOption> = (
    options = {
        desc: false,
        nullable: false,
    }
): sortable<datable> => {
    const sorter = getSorter(options);
    const parser = options.customParser || (options.nullable ? parseNullableDate : parseDate);

    return (first, second) => sorter(parser(first!).getTime() - parser(second!).getTime());
};

export default byDate;
