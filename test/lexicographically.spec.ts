import "mocha";
import fc from "fast-check";
import { lexicographically } from "../src";
import { sortable } from "../src/types/types";
import { expect } from "chai";
import { descToSign } from "./utils/sort";

function comparators(): fc.Arbitrary<{
  sign: number;
  itemCmp: sortable<number>;
  seqCmp: sortable<number[]>;
}> {
  return fc.tuple(fc.compareFunc(), fc.boolean()).chain(([itemCmp, desc]) => {
    return fc.constant({
      sign: descToSign(desc),
      itemCmp,
      seqCmp: lexicographically(itemCmp, { desc }),
    });
  });
}

describe("sorting lexiocgraphically", () => {
  it("treats identical sequences as equal", () => {
    fc.assert(
      fc.property(comparators(), fc.array(fc.integer()), ({ seqCmp }, seq) => {
        expect(seqCmp(seq, [...seq])).to.equal(0);
      })
    );
  });

  it("treats treats null or undefined as an empty sequence", () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.constantFrom(null, undefined, [])),
        fc.oneof(fc.constantFrom(null, undefined, [])),
        fc.array(fc.integer(), { minLength: 1 }),
        comparators(),
        (empty1, empty2, nonempty, { seqCmp, sign }) => {
          expect(seqCmp(empty1, nonempty) * sign).to.be.below(0);
          expect(seqCmp(nonempty, empty1) * sign).to.be.above(0);
          expect(seqCmp(empty1, empty2)).to.equal(0);
        }
      )
    );
  });

  it("sorts a shorter sequence before a longer sequence", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(),
        comparators(),
        (prefix, item, { seqCmp, sign }) => {
          expect(seqCmp(prefix, [...prefix, item]) * sign).to.be.below(0);
          expect(seqCmp([...prefix, item], prefix) * sign).to.be.above(0);
        }
      )
    );
  });

  it("sorts sequences like their first differing element", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(),
        fc.integer(),
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        comparators(),
        (prefix, item1, item2, suffix1, suffix2, { seqCmp, itemCmp, sign }) => {
          fc.pre(itemCmp(item1, item2) !== 0);
          expect(
            seqCmp(
              [...prefix, item1, ...suffix1],
              [...prefix, item2, ...suffix2]
            ) * sign
          ).to.equal(itemCmp(item1, item2));
        }
      )
    );
  });

  it("sorts sequences with a common prefix like their tails", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        comparators(),
        (prefix, tail1, tail2, { seqCmp }) => {
          expect(
            seqCmp([...prefix, ...tail1], [...prefix, ...tail2])
          ).to.be.equal(seqCmp(tail1, tail2));
        }
      )
    );
  });
});
