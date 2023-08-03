import { getSorter } from "../sort";
import { SortByNumberOption } from "../interfaces/interfaces";
import { sortable, sortableWithOption } from "../types/types";

/**
 * the sortable to sort the **number primitive**
 * @param options the options to sort the numbers correctly
 *
 * {@link https://sort-es.netlify.app/by-number byNumber docs}
 * @version 1.0.0
 */
const byNumber: sortableWithOption<number, SortByNumberOption> = (
  options: SortByNumberOption = {
    desc: false,
    nullable: false,
  }
): sortable<number> => {
  // Convert the options to primitive numbers in local variables.
  const sign = getSorter(options)(1);
  let signOfNaN: number;
  switch (options.sortNaN) {
    // The default setting is to sort NaN after any other value.  This is a
    // change from the previous behavior, but any code that relied on the old
    // behavior was almost certainly already broken anyway.  Before, the
    // comparison function was inconsistent in the presence of NaN, and using it
    // to sort an array containing NaN would therefore produce unspecified
    // results according to the ECMAScript spec.  The new behavior at least
    // produces a well-defined sort order.
    //
    // Why sort NaN after other values rather than before?  JavaScript's sorting
    // algorithm always sorts undefined after any other value--it never even
    // calls the comparison function with an undefined argument.  Since NaN is
    // conceptually very simliar to undefined in a numeric context, the least
    // surprising thing to do is to treat NaN similarly to undefined.
    case undefined:
    case "last":
      signOfNaN = 1;
      break;
    case "first":
      signOfNaN = -1;
      break;
    default:
      signOfNaN = 0;
  }

  // This is the basic comparison function used as-if unless `nullable` is set.
  const compare = (first: number, second: number): number => {
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

    // At this point, either `first`, `second`, or both must be NaN or undefined.

    // We use 0 as a sentinel value to signal that NaN should be treated as an
    // error; undefined is not treated as an error because JavaScript's sorting
    // algorithm has well-defined behavior for undefined.
    if (signOfNaN === 0 && (first !== first || second !== second)) {
      throw new Error(`Invalid comparison: ${first}, ${second}`);
    }

    // This comparison sorts undefined after all other values.  Depending on
    // this `sortNaN` option, it sorts NaN before or after all other values
    // (except undefined).  Note that the `desc` setting is intentionally
    // ignored here.
    return (
      (first !== first ? signOfNaN : first === undefined ? 2 : 0) -
      (second !== second ? signOfNaN : second === undefined ? 2 : 0)
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
