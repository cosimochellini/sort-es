import "mocha";
import {expect} from "chai";
import {byNumber} from "../src/index";
import {getFirstAndLast, reverse} from "./utils/sort";
import {expectObjectToBeEquals} from "./utils/expectFns";

const arrayUnsorted = [44, 12, 34, 124, 21.5];
const correctArraySorted = [12, 21.5, 34, 44, 124];

describe("ByNumber sorting", () => {
  it("Does sort an array by number", () => {
    const arraySorted = arrayUnsorted.sort(byNumber());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(12);

    expect(last).to.equal(124);

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByNumber sorting desc", () => {
  it("Does sort an array by string descending", () => {
    const arraySorted = arrayUnsorted.sort(byNumber({desc: true}));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(124);

    expect(last).to.equal(12);

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});


describe("ByNumber sorting with infinite values", () => {
  it("Does sort an array by number", () => {
    const arrayUnsortedWithInfinity = [44, 12, 34, 124, 21.5, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY];
    const correctArraySortedWithInfinity = [Number.NEGATIVE_INFINITY, 12, 21.5, 34, 44, 124, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];

    const arraySorted = arrayUnsortedWithInfinity.sort(byNumber());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(Number.NEGATIVE_INFINITY);

    expect(last).to.equal(Number.POSITIVE_INFINITY);

    expectObjectToBeEquals(arraySorted, correctArraySortedWithInfinity);
  });
});
