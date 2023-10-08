import { getSorter } from "../sort";
import {
  DEFAULT_NUMBER_VALUE_CATEGORY_ORDER,
  NumberValueCategory,
  SortByNumberOption,
} from "../interfaces/interfaces";
import { sortable, sortableWithOption } from "../types/types";


export type NumberLike = number | null | undefined;

export function normalizeNumberValueCategoryOrder(order: NumberValueCategory[]): void {
  if (new Set(order).size !== order.length) {
    throw new TypeError("valuesOrder may not contain duplicate values");
  }
  if (!order.includes("other")) {
    order.unshift("other");
  }
  DEFAULT_NUMBER_VALUE_CATEGORY_ORDER.forEach((kind) => {
    if (!order.includes(kind)) {
      order.push(kind);
    }
  });
}

type ValueCategoryOrderRecord = Record<NumberValueCategory, number>;

function makeValuesOrderRecord(
  inputOrder: readonly NumberValueCategory[]
): ValueCategoryOrderRecord {
  const order: NumberValueCategory[] = [...inputOrder];
  normalizeNumberValueCategoryOrder(order);

  const result: Partial<ValueCategoryOrderRecord> = {};
  order.forEach((kind, index) => {
    result[kind] = index;
  });
  return result as Required<typeof result>;
}

function numberValueCategoryIndex(
  n: NumberLike,
  record: ValueCategoryOrderRecord
): number {
  if (n !== n) {
    return record.NaN;
  }
  if (n == null) {
    if (n === null) {
      return record.null;
    }
    return record.undefined;
  }
  return record.other;
}

/**
 * the sortable to sort the **number primitive**
 * @param options the options to sort the numbers correctly
 *
 * {@link https://sort-es.netlify.app/by-number byNumber docs}
 * @version 1.0.0
 */
const byNumber: sortableWithOption<NumberLike, SortByNumberOption> = (
  options: SortByNumberOption = {
    desc: false,
    nullable: false,
  }
): sortable<number> => {
  // Convert the options to primitive numbers in local variables.
  const sign = getSorter(options)(1);
  const valuesOrderRecord = makeValuesOrderRecord(
    options.valueCategoryOrder ?? []
  );

  // This is the basic comparison function used as-if unless `nullable` is set.
  const compare = (first: NumberLike, second: NumberLike): number => {
    if (first != null && second != null) {
      // Start with a naive comparison.
      const delta = first - second;

      // This branch handles all cases except those involving NaN or infinites of
      // the same sign.  We use the === operator to detect NaN because it's
      // probably faster than calling Math.isNaN.
      if (delta === delta) {
        return sign * delta;
      }

      // This branch handles infinities with the same sign, as well as comparing
      // undefined to itself.
      if (first === second) {
        return 0;
      }
    }

    // At this point, either `first`, `second`, or both must be NaN, null, or undefined.
    return (
      numberValueCategoryIndex(first, valuesOrderRecord) -
      numberValueCategoryIndex(second, valuesOrderRecord)
    );
  };

  // If requested, wrap the comparison function so it treats falsy values as
  // equal to 0.  Despite the name, this option has no effect on the treatment
  // of null, because ordinary subtraction treats null as equal to 0.  It also
  // has no effect on how undefined is sorted by JavaScript's native sort
  // algorithm, because undefined is always sorted last regardless of the
  // comparison function.
  if (options.nullable) {
    return (first: number, second: number) => compare(first || 0, second || 0);
  }

  return compare;
};

export default byNumber;
