import { sortable } from "../types/types";

const getValueByDiscriminator = <T, K extends keyof T>(
  obj: T,
  discriminator: K | ((item: T) => T[K])
): T[K] => {
  return typeof discriminator === "function"
    ? discriminator(obj)
    : obj[discriminator];
};

const byValue = <T, K extends keyof T>(
  discriminator: K | ((item: T) => T[K]),
  sortFn: sortable<T[K]>
): sortable<T> => {
  return (first: T, second: T): number => {
    const firstItem: T[K] = getValueByDiscriminator(first, discriminator);

    const secondItem: T[K] = getValueByDiscriminator(second, discriminator);

    return sortFn(firstItem, secondItem);
  };
};

export default byValue;
