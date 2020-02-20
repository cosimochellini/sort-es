const byValue = <T, TPropType>(
  discriminator: string | ((item: T) => TPropType),
  sortFn: sortable<TPropType>
): sortable<T> => {
  return (first: T, second: T) => {
    const firstItem: TPropType = getValueByDiscriminator(first, discriminator);

    const secondItem: TPropType = getValueByDiscriminator(
      second,
      discriminator
    );

    return sortFn(firstItem, secondItem);
  };
};

const getValueByDiscriminator = <T, TPropType>(
  obj: T,
  discriminator: string | ((item: T) => TPropType)
): TPropType => {
  return typeof discriminator === "string"
    ? obj[discriminator]
    : discriminator(obj);
};

export default byValue;
