type sortable<T> = (first: T, second: T) => number
type sortableWithOption<T> = (options?: sortOption) => sortable<T>

interface sortOption {
    desc?: boolean,
}


interface sortByDateOption {
    desc?: boolean,
    customParser?: (item: string | number) => Date
}

const byString: sortableWithOption<string> = (options: sortOption = { desc: false }): sortable<string> => {
    return (first: string, second: string) => sort(first.localeCompare(second), options)
}

const byNumber: sortableWithOption<number> = (options: sortOption = { desc: false }): sortable<number> => {
    return (first: number, second: number) => sort(first - second, options);
}

const byDate: sortableWithOption<Date | string> = (options: sortByDateOption = { desc: false }): sortable<Date | string> => {

    return (first: Date | string, second: Date | string) => {

        if (typeof first === "string") first = options.customParser(first) ?? new Date(first)

        if (typeof second === "string") second = options.customParser(second) ?? new Date(second)

        return sort(first.getTime() - second.getTime(), options)
    }
}

const byValue = <T, TPropType>(discriminator: string | ((item: T) => TPropType), sortFn: sortable<TPropType>): sortable<T> => {

    return (first: T, second: T) => {

        const firstItem: TPropType = getValueByDiscriminator(first, discriminator)
        const secondItem: TPropType = getValueByDiscriminator(second, discriminator)

        return sortFn(firstItem, secondItem);
    }
}

const getValueByDiscriminator = <T, TPropType>(obj: T, discriminator: string | ((item: T) => TPropType)): TPropType => {

    return (typeof discriminator === "string") ? obj[discriminator] : discriminator(obj)

}

const sort = (sortResult: number, options: sortOption) => (options.desc ? 1 : -1) * sortResult

export default {
    byString,
    byNumber,
    byDate,
    byValue,
}

export {
    byString,
    byNumber,
    byDate,
    byValue,
}