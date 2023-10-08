import { sortable, sortableWithOption } from "../types/types";

const byDefault: sortableWithOption<unknown, { desc?: boolean }> = ({
  desc = false,
} = {}): sortable<unknown> => {
  const sign = desc ? -1 : 1;
  return (x: unknown, y: unknown): number => {
    if (x === undefined) {
      if (y === undefined) {
        return 0;
      } else {
        return sign;
      }
    }
    if (y === undefined) {
      return -sign;
    }
    const xString = String(x);
    const yString = String(y);
    const xSmaller = xString < yString;
    if (xSmaller) {
      return -sign;
    }
    const ySmaller = yString < xString;
    if (ySmaller) {
      return sign;
    }
    return 0;
  };
};

export default byDefault;
