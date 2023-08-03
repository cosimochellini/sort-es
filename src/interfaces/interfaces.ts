import { datable } from "../types/types";

interface SortOption {
  desc?: boolean;
  nullable?: boolean;
}

interface SortByNumberOption extends SortOption {
  /**
   * This option controls how NaN values are sorted:
   *
   * - "first" or undefined: NaN is sorted before any other value.
   * - "last": NaN is sorted after any other value.
   * - "error": Any comparison involving NaN throws an error.
   */
  sortNaN?: "first" | "last" | "error";

  /**
   * @deprecated Using this option results in a comparison function that is
   * inconistent with the behavior of `Array.prototype.sort`, which always sorts
   * `undefined` to the end of the array regardless of the comparison function.
   * Futhermore, this option is not useful for controlling the sorting of
   * `null`, because `byNumber` always treats `null` as equal to 0.
   */
  nullable?: boolean;
}

interface SortByStringOption extends SortOption {
  lowercase?: boolean;
}

interface SortByDateOption extends SortOption {
  customParser?: (item: datable) => Date;
}

export { SortOption, SortByNumberOption, SortByStringOption, SortByDateOption };
