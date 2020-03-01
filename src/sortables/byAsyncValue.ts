import { sortable } from 'src/types/types';

const sortAsync = async <T>(asyncItems: Promise<T>[], sortFn: sortable<T>): Promise<T[]> => {

    const items = await Promise.all(asyncItems);

    return items.sort(sortFn);
}


export class AsyncArray<T> extends Array<T> {
    constructor(items?: Array<T>) {
        super(...items);
    }

    public async sortAsync<TSync>(sortFn: sortable<TSync>): Promise<TSync[]> {

        const items: TSync[] = await Promise.all(this.values);

        return items.sort(sortFn);
    }
}
export default sortAsync;