import {sortable} from "../types/types";

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
