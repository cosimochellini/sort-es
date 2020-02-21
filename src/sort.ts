import { SortOption } from "./interfaces/interfaces";

const sort = (sortResult: number, options: SortOption): number =>
  (options.desc ? -1 : 1) * sortResult;

export default sort;
