import "mocha";
import fc from "fast-check";
import { byNumber, lexicographically } from "../src";

describe("lexiocgraphically", () => {
  const innerCmp = byNumber();
  const cmp = lexicographically(innerCmp);

  it("treats identical sequences as equal", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (seq) => cmp(seq, [...seq]) === 0)
    );
  });

  it("treats treats null or undefined as an empty sequence", () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.constantFrom(null, undefined, [])),
        fc.oneof(fc.constantFrom(null, undefined, [])),
        fc.array(fc.integer(), { minLength: 1 }),
        (empty1, empty2, nonempty) =>
          cmp(empty1, nonempty) < 0 &&
          cmp(nonempty, empty1) > 0 &&
          cmp(empty1, empty2) === 0
      )
    );
  });

  it("sorts a shorter sequence before a longer sequence", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(),
        (prefix, item) => cmp(prefix, [...prefix, item]) < 0
      )
    );
  });

  it("sorts a longer sequence after a shorter sequence", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.integer(),
        (prefix, item) => cmp([...prefix, item], prefix) > 0
      )
    );
  });

  it("sorts sequences like their first differing element", () => {
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
          ) === innerCmp(item1, item2)
      )
    );
  });

  it("sorts sequences with a common prefix like their tails", () => {
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
