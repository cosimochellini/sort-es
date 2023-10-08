import "mocha";
import fc from "fast-check";
import { byNumber, lexicographically } from "../src";

describe("lexiocgraphically", () => {
  const innerCmp = byNumber();

  [
    { desc: false, sign: 1, suffix: " (ascending)" },
    { desc: true, sign: -1, suffix: " (descending)" },
  ].forEach(({ desc, sign, suffix }) => {
    const cmp = lexicographically(innerCmp, { desc });

    it("treats identical sequences as equal" + suffix, () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (seq) => cmp(seq, [...seq]) === 0)
      );
    });

    it("treats treats null or undefined as an empty sequence" + suffix, () => {
      fc.assert(
        fc.property(
          fc.oneof(fc.constantFrom(null, undefined, [])),
          fc.oneof(fc.constantFrom(null, undefined, [])),
          fc.array(fc.integer(), { minLength: 1 }),
          (empty1, empty2, nonempty) =>
            cmp(empty1, nonempty) * sign < 0 &&
            cmp(nonempty, empty1) * sign > 0 &&
            cmp(empty1, empty2) === 0
        )
      );
    });

    it("sorts a shorter sequence before a longer sequence" + suffix, () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.integer(),
          (prefix, item) => cmp(prefix, [...prefix, item]) * sign < 0
        )
      );
    });

    it("sorts a longer sequence after a shorter sequence" + suffix, () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.integer(),
          (prefix, item) => cmp([...prefix, item], prefix) * sign > 0
        )
      );
    });

    it("sorts sequences like their first differing element" + suffix, () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.tuple(fc.integer(), fc.integer()).filter(([x, y]) => x !== y),
          fc.array(fc.integer()),
          fc.array(fc.integer()),
          (prefix, [item1, item2], suffix1, suffix2) =>
            cmp(
              [...prefix, item1, ...suffix1],
              [...prefix, item2, ...suffix2]
            ) *
              sign ===
            innerCmp(item1, item2)
        )
      );
    });

    it("sorts sequences with a common prefix like their tails" + suffix, () => {
      fc.assert(
        fc.property(
          fc.array(fc.integer()),
          fc.array(fc.integer()),
          fc.array(fc.integer()),
          (prefix, tail1, tail2) =>
            cmp([...prefix, ...tail1], [...prefix, ...tail2]) ===
            cmp(tail1, tail2)
        )
      );
    });
  });
});
