import "mocha";
import fc from "fast-check";
import { isSorted, naiveNumberCompare, sort } from "./utils/sort";

describe("utils", () => {
  describe("isSorted", () => {
    it("returns true for sorted arrays", () => {
      fc.assert(
        fc.property(
          fc.array(fc.nat()).map((data) => data.sort(naiveNumberCompare)),
          (data) => isSorted(data, naiveNumberCompare) === true
        )
      );
    });

    it("returns false for unsorted arrays", () => {
      fc.assert(
        fc.property(
          fc
            .uniqueArray(fc.nat(), { minLength: 2 })
            .chain((data) =>
              fc.tuple(
                fc.constant(data.sort(naiveNumberCompare)),
                fc.integer({ min: 1, max: data.length - 1 })
              )
            ),
          ([data, index]) =>
            isSorted([...data.slice(index), ...data.slice(0, index)], naiveNumberCompare) ===
            false
        )
      );
    });
  });

  describe("sorted", () => {
    it("sorts correctly", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), fc.compareFunc(), (data, cmp) =>
          isSorted(sort(data, cmp), cmp)
        )
      );
    });
  });
});
