import { datable } from "../types/types";

export interface SortOption {
  desc?: boolean;
  nullable?: boolean;
}

/**
 * The default value of {@link SortByNumberOption.valuesOrder}.
 */
export const DEFAULT_NUMBER_VALUE_CATEGORY_ORDER = [
    "other",
    "NaN",
    "null",
    "undefined",
] as const;

/**
 * A kind of value that can be sorted using `byNumber`.
 */
export type NumberValueCategory = (typeof DEFAULT_NUMBER_VALUE_CATEGORY_ORDER)[number];

/**
 * Sorting options for `byNumber`.
 */
export interface SortByNumberOption extends SortOption {
  /**
   * This option controls how various special values are sorted relative to one
   * another.
   *
   * Each possible value may appear at most once. The default order is ["other",
   * "NaN", "null", "undefined"], meaning ordinary numbers are sortered first,
   * followed by any `NaN`, then all `null` values, and finally all `undefined`
   * values.
   *
   * Omitting "other" is the same as putting it first.  Omitting any of "NaN",
   * "null", or "undefined" is the same as putting that value last; omitting
   * more than one is the same as putting the last in the same order as in the
   * default array.
   *
   * The {@link SortOption.desc} does not affect the order created by this
   * option. It only affects how numbers are sorted within the "others"
   * category.
   *
   * Note that `Array.sort` always acts as if "undefined" is last, regardless of
   * any sorting options.
   */
    valueCategoryOrder?: NumberValueCategory[];

  /**
   * @deprecated Using this option results in a comparison function that is
   * inconistent with the behavior of `Array.prototype.sort`, which always sorts
   * `undefined` to the end of the array regardless of the comparison function.
   * Futhermore, this option is not useful for controlling the sorting of
   * `null`, because `byNumber` always treats `null` as equal to 0.
   */
  nullable?: boolean;
}

export interface SortByStringOption extends SortOption {
  lowercase?: boolean;
}

export interface SortByDateOption extends SortOption {
  customParser?: (item: datable) => Date;
}
