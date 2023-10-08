import "mocha";
import fc from "fast-check";
import {
  DEFAULT_NUMBER_VALUE_CATEGORY_ORDER,
  NumberValueCategory,
} from "../src/interfaces/interfaces";
import byNumber, {
  NumberLike,
  normalizeNumberValueCategoryOrder,
} from "../src/sortables/byNumber";


const arbSortable: fc.Arbitrary<NumberLike> = fc.oneof(
  { weight: 10, arbitrary: fc.double() },
  fc.constant(Infinity),
  fc.constant(-Infinity),
  fc.constant(NaN),
  fc.constant(null),
  fc.constant(undefined)
);

const arbCategoryOrder = fc.shuffledSubarray(
  DEFAULT_NUMBER_VALUE_CATEGORY_ORDER.filter((cat) => cat !== "undefined")
);

function categoryOf(n: NumberLike): NumberValueCategory {
  if (n === null) {
    return "null";
  }
  if (n === undefined) {
    return "undefined";
  }
  if (n !== n) {
    return "NaN";
  }
  return "other";
}

describe("ByNumber sorting", () => {
  it("sorts numbers into the right categories", () => {
    fc.assert(
      fc.property(
        fc.array(arbSortable),
        arbCategoryOrder,
        fc.boolean(),
        (array, order, desc) => {
          array.sort(byNumber({ valueCategoryOrder: order, desc }));
          
          let i = 0;
          normalizeNumberValueCategoryOrder(order);
          for (const category of order) {
            while (i < array.length && categoryOf(array[i]) === category) {
              i++;
            }
          }
          return i === array.length;
        }
      ),
      { numRuns: 10_000 }
    );
  });

  it("sorts numbers correctly", () => {
    fc.assert(
      fc.property(
        fc.array(arbSortable),
        arbCategoryOrder,
        fc.boolean(),
        (array, order, desc) => {
          array.sort(byNumber({ valueCategoryOrder: order, desc }));
          
          const sign = desc ? -1 : 1;
          const justNumbers = array.filter((n) => categoryOf(n) === "other");
          for (let i = 0; i < justNumbers.length - 1; i++) {
            if (!(sign * justNumbers[i] <= sign * justNumbers[i + 1])) {
              return false;
            }
          }
          return true;
        }
      ),
      { numRuns: 10_000 }
    );
  });
});

