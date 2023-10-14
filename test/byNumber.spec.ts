import { expect } from "chai";
import fc from "fast-check";
import "mocha";
import {
  DEFAULT_NUMBER_VALUE_CATEGORY_ORDER,
  NumberValueCategory,
  SortByNumberOption,
} from "../src/interfaces/interfaces";
import byNumber, {
  NumberLike,
  normalizeNumberValueCategoryOrder,
} from "../src/sortables/byNumber";

function someCategory(): fc.Arbitrary<NumberValueCategory> {
  return fc.constantFrom(...DEFAULT_NUMBER_VALUE_CATEGORY_ORDER);
}

function someCategoryOrder(): fc.Arbitrary<NumberValueCategory[]> {
  return fc.shuffledSubarray(Array.from(DEFAULT_NUMBER_VALUE_CATEGORY_ORDER));
}

function someInstanceOfCategory(
  category: NumberValueCategory
): fc.Arbitrary<NumberLike> {
  switch (category) {
    case "undefined":
      return fc.constant(undefined);
    case "NaN":
      return fc.constant(NaN);
    case "null":
      return fc.constant(null);
    case "other":
      return fc.double({ noNaN: true });
  }
}

function someCategoryAndValue(): fc.Arbitrary<
  [NumberValueCategory, NumberLike]
> {
  return someCategory().chain((category) =>
    fc.tuple(fc.constant(category), someInstanceOfCategory(category))
  );
}

function someSortByNumberOption(): fc.Arbitrary<SortByNumberOption> {
  return fc
    .tuple(someCategoryOrder(), fc.boolean())
    .map(([valueCategoryOrder, desc]) => ({
      valueCategoryOrder,
      desc,
    }));
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
        someCategoryOrder(),
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
        someCategoryOrder().filter((order) => !order.includes("other")),
        (rawOrder) => normOrder(rawOrder)[0] === "other"
      )
    );
  });

  it("puts other categories last", () => {
    fc.assert(
      fc.property(
        someCategoryOrder().filter((order) => order.includes("other")),
        (rawOrder) => {
          expect(normOrder(rawOrder).slice(0, rawOrder.length)).deep.equals(
            rawOrder
          );
        }
      )
    );
  });
});

describe("ByNumber sorting", () => {
  it("sorts correctly by category", () => {
    fc.assert(
      fc.property(
        someSortByNumberOption(),
        someCategoryAndValue(),
        someCategoryAndValue(),
        (sortOpts, [cat1, val1], [cat2, val2]) => {
          fc.pre(cat1 !== cat2);
          const order = normOrder(sortOpts.valueCategoryOrder!);
          expect(Math.sign(byNumber(sortOpts)(val1, val2))).equals(
            Math.sign(order.indexOf(cat1) - order.indexOf(cat2))
          );
        }
      )
    );
  });

  it("sorts ordinary numbers correctly", () => {
    fc.assert(
      fc.property(
        someSortByNumberOption(),
        fc.double({ noNaN: true }),
        fc.double({ noNaN: true }),
        (sortOpts, val1, val2) => {
          const sign = sortOpts.desc ? -1 : 1;
          return (
            Math.sign(byNumber(sortOpts)(val1, val2)) ===
            sign * Math.sign(val1 - val2)
          );
        }
      )
    );
  });
});
