import "mocha";
import { expect } from "chai";
import { byNumber } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";

const arrayUnsorted = [44, 12, 34, 124, 21.5];
const correctArraySorted = [12, 21.5, 34, 44, 124];

describe("ByNumber sorting", function() {
  it("Does sort an array by number", function() {
    const arraySorted = arrayUnsorted.sort(byNumber());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(12);

    expect(last).to.equal(124);

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByNumber sorting desc", function() {
  it("Does sort an array by string descending", function() {
    const arraySorted = arrayUnsorted.sort(byNumber({ desc: true }));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(124);

    expect(last).to.equal(12);

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});
