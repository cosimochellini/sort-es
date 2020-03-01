const sortAsync = async <T>(asyncItems: Promise<T>[]): Promise<T[]> => await Promise.all(asyncItems);

export default sortAsync