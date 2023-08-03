import "mocha";
import { expect } from "chai";
import { byNumber } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectStringToBeEquals } from "./utils/expectFns";

const finiteUnsorted = [44, 12, 34, 124, 21.5];
const finiteSorted = [12, 21.5, 34, 44, 124];
const nullableUnsorted = [null, 1, -1, null, 2, -2];
const nullableSorted = [-2, -1, null, null, 1, 2];
const infinitiesUnsorted = [
  Infinity,
  -Infinity,
  Infinity,
  -Infinity,
  Infinity,
  -Infinity,
];
const inifinitiesSorted = [
  -Infinity,
  -Infinity,
  -Infinity,
  Infinity,
  Infinity,
  Infinity,
];
const mixedUnsorted = [44, 12, 34, 0, NaN, Infinity, -Infinity, 124, 21.5, NaN];
const mixedSortedNaNFirst = [
  NaN,
  NaN,
  -Infinity,
  0,
  12,
  21.5,
  34,
  44,
  124,
  Infinity,
];
const mixedSortedNaNLast = [
  -Infinity,
  0,
  12,
  21.5,
  34,
  44,
  124,
  Infinity,
  NaN,
  NaN,
];

describe("ByNumber sorting", () => {
  it("Sorts an array by number", () => {
    const arraySorted = finiteUnsorted.sort(byNumber());
    const [first, last] = getFirstAndLast(arraySorted);
    expect(first).to.equal(12);
    expect(last).to.equal(124);
    expectStringToBeEquals(arraySorted, finiteSorted);
  });

  it("Sorts an array by number descending", () => {
    const arraySorted = finiteUnsorted.sort(byNumber({ desc: true }));
    const [first, last] = getFirstAndLast(arraySorted);
    expect(first).to.equal(124);
    expect(last).to.equal(12);
    expectStringToBeEquals(arraySorted, reverse(finiteSorted));
  });
  it("Sorts nullable values", () => {
    const arraySorted = nullableUnsorted.sort(byNumber({ nullable: true }));
    const [first, last] = getFirstAndLast(arraySorted);
    expect(first).to.equal(-2);
    expect(last).to.equal(2);
    expectStringToBeEquals(arraySorted, nullableSorted);
  });

  it("Sorts nullable values descending", () => {
    const arraySorted = nullableUnsorted.sort(
      byNumber({ nullable: true, desc: true })
    );
    const [first, last] = getFirstAndLast(arraySorted);
    expect(first).to.equal(2);
    expect(last).to.equal(-2);
    expectStringToBeEquals(arraySorted, reverse(nullableSorted));
  });

  it("Sorts infinities", () => {
    const arraySorted = infinitiesUnsorted.sort(byNumber());
    const [first, last] = getFirstAndLast(arraySorted);
    expect(first).to.equal(-Infinity);
    expect(last).to.equal(Infinity);
    expectStringToBeEquals(arraySorted, inifinitiesSorted);
  });

  it("Sorts infinities descending", () => {
    const arraySorted = infinitiesUnsorted.sort(byNumber({ desc: true }));
    const [first, last] = getFirstAndLast(arraySorted);
    expect(first).to.equal(Infinity);
    expect(last).to.equal(-Infinity);
    expectStringToBeEquals(arraySorted, reverse(inifinitiesSorted));
  });

  it("Sorts mixed types with NaN first", () => {
    const arraySorted = mixedUnsorted.sort(byNumber({ sortNaN: "first" }));
    expectStringToBeEquals(arraySorted, mixedSortedNaNFirst);
  });

  it("Sorts mixed types with NaN last", () => {
    const arraySorted = mixedUnsorted.sort(byNumber({ sortNaN: "last" }));
    expectStringToBeEquals(arraySorted, mixedSortedNaNLast);
  });

  it("Sorts mixed types descending with NaN first", () => {
    const arraySorted = mixedUnsorted.sort(
      byNumber({ sortNaN: "first", desc: true })
    );
    expectStringToBeEquals(arraySorted, reverse(mixedSortedNaNLast));
  });

  it("Sorts mixed types descending with NaN last", () => {
    const arraySorted = mixedUnsorted.sort(
      byNumber({ sortNaN: "last", desc: true })
    );
    expectStringToBeEquals(arraySorted, reverse(mixedSortedNaNFirst));
  });

  it("Throws an error on NaN", () => {
    expect(() => byNumber({ sortNaN: "error" })(0, NaN)).throws();
    expect(() => byNumber({ sortNaN: "error" })(NaN, 0)).throws();
    expect(() => byNumber({ sortNaN: "error" })(NaN, NaN)).throws();
  });

  it("Does not throw an error on undefined", () => {
    byNumber({ sortNaN: "error" })(0, undefined);
    byNumber({ sortNaN: "error" })(undefined, 0);
    byNumber({ sortNaN: "error" })(undefined, undefined);
  });

  // TODO
  // it("Sorts undefined last", () => {
  //   for (const compare of [byNumber(), byNumber({ desc: true })]) {
  //     for (const defined of [NaN, -Infinity, 0, Infinity]) {
  //       expect(compare(undefined, defined)).to.be.lessThan(0);
  //       expect(compare(defined, undefined)).to.be.greaterThan(0);
  //     }
  //   }

  //   const NaNFirstArray = [NaN, -Infinity, 0, Infinity, undefined];
  //   const NaNLastArray = [-Infinity, 0, Infinity, NaN, undefined];
  //   const NaNFirst = byNumber({ sortNaN: "first" });
  //   const NaNLast = byNumber({ sortNaN: "last" });
  //   const NaNDefault = byNumber();

  //   for (let i = 1; i < NaNFirstArray.length; i++) {
  //     expect(NaNFirst(NaNFirstArray[i - 1], NaNFirstArray[i])).to.be.lessThan(
  //       0
  //     );
  //     expect(NaNLast(NaNLastArray[i - 1], NaNLastArray[i])).to.be.lessThan(0);
  //     expect(NaNDefault(NaNLastArray[i - 1], NaNLastArray[i])).to.be.lessThan(
  //       0
  //     );
  //     expect(
  //       NaNFirst(NaNFirstArray[i], NaNFirstArray[i - 1])
  //     ).to.be.greaterThan(0);
  //     expect(NaNLast(NaNLastArray[i], NaNLastArray[i - 1])).to.be.greaterThan(
  //       0
  //     );
  //     expect(
  //       NaNDefault(NaNLastArray[i], NaNLastArray[i - 1])
  //     ).to.be.greaterThan(0);
  //   }
  // });

  it("Sorts many types of values", () => {
    mixedSortedNaNFirst
  });
});
