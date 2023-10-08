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

const arbPrimitive = fc.oneof(
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

const arbSortable = fc.oneof(
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

const arbDefinedSortable = arbSortable.filter((x) => x !== undefined);

describe("byDefault", () => {
  const ascending = byDefault();
  const descending = byDefault({ desc: true });

  it("treats undefined compares as equal to itself", () => {
    expect(ascending(undefined, undefined)).equal(0);
  });

  it("treats undefined as greater than anything else", () => {
    fc.assert(
      fc.property(
        arbSortable.filter((x) => x !== undefined),
        (x) => {
          return (
            ascending(x, undefined) === -1 && ascending(undefined, x) === 1
          );
        }
      )
    );
  });

  it("works the same as the default sort order", () => {
    fc.assert(
      fc.property(arbSortable, arbSortable, (x, y) => {
        const a1 = [x, y];
        const a2 = [x, y];
        a1.sort();
        a2.sort(ascending);
        return eq(a1, a2);
      }),
      { numRuns: 1000 }
    );
  });

  it("works in descending mode", () => {
    fc.assert(
      fc.property(arbDefinedSortable, arbDefinedSortable, (x, y) => {
        const a1 = [x, y];
        const a2 = [x, y];
        a1.reverse().sort().reverse();
        a2.sort(descending);
        return eq(a1, a2);
      }),
      { numRuns: 1000 }
    );
  });
});
