const getFirstAndLast = <T>(array: T[]): [T, T] => {
  const {0: first, [array.length - 1]: last} = array;
  return [first, last]
};

const reverse = <T>(array: T[]): T[] => array.concat().reverse();

const descToSign = (desc: boolean): number => desc ? -1 : 1;

export {getFirstAndLast, reverse, descToSign}
