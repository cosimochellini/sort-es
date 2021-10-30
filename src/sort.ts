import type { SortOption } from "./interfaces/interfaces";

export const getSorter = (options: SortOption): ((result: number) => number) =>
  options.desc ? (result: number) => result * -1 : (result: number) => result;
