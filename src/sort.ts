import { sortOption } from "./interfaces/interfaces";

const sort = (sortResult: number, options: sortOption) =>
  (options.desc ? 1 : -1) * sortResult;

export default sort;
