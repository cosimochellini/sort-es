import "mocha";
import { expect } from "chai";
import byDefault from "../src/sortables/byDefault";
import fc from "fast-check";

function eq(a: unknown, b: unknown): boolean {
  // NaN equals itself.
  if (a !== a && b !== b) {
    return true;
  }
  // Arrays are compared elementwise.
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!eq(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
}

const arbPrimitive: fc.Arbitrary<unknown> = fc.oneof(
  fc.float(),
  fc.constant(NaN),
  fc.constant(Infinity),
  fc.constant(-Infinity),
  fc.constant(0),
  fc.string(),
  fc.boolean(),
  fc.constant(null),
  fc.constant(undefined),
  fc.bigIntN(64)
);

const arbSortable: fc.Arbitrary<unknown> = fc.oneof(
  { weight: 10, arbitrary: arbPrimitive },
  arbPrimitive.map((p) => ({
    toString: undefined,
    valueOf(): unknown {
      return p;
    },
  })),
  arbPrimitive.map((p) => ({
    valueOf: undefined,
    toString(): unknown {
      return p;
    },
  }))
);

describe("byDefault", () => {
  const ascending = byDefault();
  const descending = byDefault({ desc: true });

  [{ fn: ascending }, { fn: descending }].forEach(({ fn }) => {
    it(`Treats undefined as equal to itself when ${fn.name}`, () => {
      expect(ascending(undefined, undefined)).equal(0);
    });

    it(`Treats undefined as greater than anything else when ${fn.name}`, () => {
      fc.assert(
        fc.property(
          arbSortable.filter((x) => x !== undefined),
          (x) => {
            return fn(x, undefined) === -1 && fn(undefined, x) === 1;
          }
        )
      );
    });
  });

  it("Works the same as the default sort order", () => {
    fc.assert(
      fc.property(arbSortable, arbSortable, (x, y) => {
        const a1 = [x, y].sort(ascending);
        const a2 = [x, y].sort();
        return eq(a1, a2);
      }),
      { numRuns: 1000 }
    );
  });

  it("Works in descending mode", () => {
    fc.assert(
      fc.property(arbSortable, arbSortable, (x, y) => {
        const a1 = [x, y];
        a1.sort(descending);
        if (x === undefined) {
          return eq(a1, [y, undefined]);
        }
        if (y === undefined) {
          return eq(a1, [x, undefined]);
        }
        const a2 = [x, y].reverse().sort().reverse();
        return eq(a2, a1);
      }),
      { numRuns: 1000 }
    );
  });
});
