const getFirstAndLast = <T>(array: T[]): [T, T] => {
  const {0: first, [array.length - 1]: last} = array;
  return [first, last]
};

const reverse = <T>(array: T[]): T[] => array.concat().reverse();

export {getFirstAndLast, reverse}
