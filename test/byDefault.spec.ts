import "mocha";
import { expect } from "chai";
import byDefault from "../src/sortables/byDefault";
import fc from "fast-check";

const somePrimitive: fc.Arbitrary<unknown> = fc.oneof(
  fc.float(),
  fc.string(),
  fc.boolean(),
  fc.bigIntN(64),
  fc.constantFrom(null, undefined)
);

const someSortable: fc.Arbitrary<unknown> = fc.oneof(
  somePrimitive,
  somePrimitive.map((p) => ({
    toString: undefined,
    valueOf(): unknown {
      return p;
    },
  })),
  somePrimitive.map((p) => ({
    valueOf: undefined,
    toString(): unknown {
      return p;
    },
  }))
);

describe("byDefault", () => {
  it(`Treats undefined as equal to itself`, () => {
    fc.assert(
      fc.property(fc.boolean(), (desc) => {
        expect(byDefault({ desc })(undefined, undefined)).equals(0);
      })
    );
  });

  it(`Treats undefined as greater than anything else`, () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        someSortable.filter((x) => x !== undefined),
        (desc, x) => {
          const cmp = byDefault({ desc });
          expect(cmp(x, undefined)).is.below(0);
          expect(cmp(undefined, x)).is.above(0);
        }
      )
    );
  });

  it("Works the same as the default sort order", () => {
    fc.assert(
      fc.property(someSortable, someSortable, (x, y) => {
        const a1 = [x, y].sort(byDefault());
        const a2 = [x, y].sort();
        expect(a1).deep.equals(a2);
      })
    );
  });

  it("Works in descending mode", () => {
    fc.assert(
      fc.property(someSortable, someSortable, (x, y) => {
        const a1 = [x, y];
        a1.sort(byDefault({ desc: true }));
        if (x === undefined) {
          expect(a1).deep.equals([y, undefined]);
        } else if (y === undefined) {
          expect(a1).deep.equals([x, undefined]);
        } else {
          expect(a1).deep.equals([x, y].reverse().sort().reverse());
        }
      })
    );
  });
});
