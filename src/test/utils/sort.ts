
const getFirstAndLast = <T>(array: T[]): T[] => {
    const { 0: first, [array.length - 1]: last } = array;
    return [first, last]
}

export { getFirstAndLast }