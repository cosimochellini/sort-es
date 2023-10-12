import { expect } from "chai";
import deepEqual from "deep-eql";
import fc, { Arbitrary } from "fast-check";
import "mocha";
import {
  DEFAULT_NUMBER_VALUE_CATEGORY_ORDER,
  NumberValueCategory,
} from "../src/interfaces/interfaces";
import byNumber, {
  NumberLike,
  normalizeNumberValueCategoryOrder,
} from "../src/sortables/byNumber";
import { isSorted, naiveNumberCompare, sort } from "./utils/sort";

function arbitraryNumberLike(): Arbitrary<NumberLike> {
  return fc.oneof(
    fc.double(),
    fc.constant(Infinity),
    fc.constant(-Infinity),
    fc.constant(NaN),
    fc.constant(null),
    fc.constant(undefined)
  );
}

function arbitraryCategoryOrder(): fc.Arbitrary<NumberValueCategory[]> {
  return fc.shuffledSubarray(Array.from(DEFAULT_NUMBER_VALUE_CATEGORY_ORDER));
}

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

function normOrder(
  order: readonly NumberValueCategory[]
): NumberValueCategory[] {
  const newOrder = Array.from(order);
  normalizeNumberValueCategoryOrder(newOrder);
  return newOrder;
}

describe("normalizeCategoryOrder", () => {
  it("creates the right number of unique values", () => {
    fc.assert(
      fc.property(
        arbitraryCategoryOrder(),
        (order) =>
          new Set(normOrder(order)).size ===
          DEFAULT_NUMBER_VALUE_CATEGORY_ORDER.length
      )
    );
  });

  it("normalizes an empty array into the default order", () => {
    expect(normOrder([])).deep.equals(DEFAULT_NUMBER_VALUE_CATEGORY_ORDER);
  });

  it("puts 'other' first", () => {
    fc.assert(
      fc.property(
        arbitraryCategoryOrder().filter((order) => !order.includes("other")),
        (rawOrder) => normOrder(rawOrder)[0] === "other"
      )
    );
  });

  it("puts other categories last", () => {
    fc.assert(
      fc.property(
        arbitraryCategoryOrder().filter((order) => order.includes("other")),
        (rawOrder) =>
          deepEqual(normOrder(rawOrder).slice(0, rawOrder.length), rawOrder)
      )
    );
  });
});

describe("ByNumber sorting", () => {
  it("sorts values into the right categories", () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryNumberLike()),
        arbitraryCategoryOrder(),
        fc.boolean(),
        (data, order, desc) => {
          data = sort(data, byNumber({ valueCategoryOrder: order, desc }));

          let i = 0;
          for (const category of normOrder(order)) {
            while (i < data.length && categoryOf(data[i]) === category) {
              i++;
            }
          }
          return i === data.length;
        }
      ),
      { numRuns: 1000 }
    );
  });

  it("sorts correctly within categories", () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryNumberLike()),
        arbitraryCategoryOrder(),
        fc.boolean(),
        (data, order, desc) => {
          const cmp = byNumber({ valueCategoryOrder: order, desc });
          data = sort(data, cmp);

          for (const category of DEFAULT_NUMBER_VALUE_CATEGORY_ORDER) {
            if (
              !isSorted(
                data.filter((x) => categoryOf(x) === category),
                cmp
              )
            ) {
              return false;
            }
          }
          return true;
        }
      ),
      { numRuns: 1000 }
    );
  });

  it("sorts ordinary numbers correctly", () => {
    fc.assert(
      fc.property(
        fc.array(fc.double().filter((x) => x === x)),
        arbitraryCategoryOrder(),
        fc.boolean(),
        (data, order, desc) => {
          const cmp = byNumber({ valueCategoryOrder: order, desc });
          const sorted = sort(data, cmp);
          if (desc) {
            sorted.reverse();
          }
          return isSorted(sorted, naiveNumberCompare);
        }
      ),
      { numRuns: 1000 }
    );
  });
});
