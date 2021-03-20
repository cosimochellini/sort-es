import { sortable } from "../types/types";

/**
 * the sortable for the async values
 * @param options sortable options for sortAsync
 *
 * {@link https://sort-es.netlify.app/by-async sortAsync docs}
 * @version 1.0.0
 */
const sortAsync = async <T>(
  asyncItems: Promise<T>[],
  sortFn: sortable<T>
): Promise<T[]> => {
  const items = await Promise.all(asyncItems);

  return items.sort(sortFn);
};

export class AsyncArray<T> extends Array<Promise<T>> {
  constructor(items: Promise<T>[]) {
    super(...items);
  }

  public async sortAsync(sortFn: sortable<T>): Promise<T[]> {
    const items = await Promise.all<T>(this);

    return items.sort(sortFn);
  }
}

export default sortAsync;
