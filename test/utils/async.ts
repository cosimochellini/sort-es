const asyncGenerator = <T>(value: T): Promise<T> => {
    return new Promise((resolve) => {
        resolve(value);
    })
};


export {
    asyncGenerator
}
