import "mocha";
import { expect } from "chai";
import { byBoolean } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";

const arrayUnsorted = [false, true, false, false, true, false];
const correctArraySorted = [true, true, false, false, false, false];

describe("byBoolean sorting", () => {
  it("Does sort an array by number", () => {
    const arraySorted = arrayUnsorted.sort(byBoolean());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(true);

    expect(last).to.equal(false);

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("byBoolean sorting desc", () => {
  it("Does sort an array by string descending", () => {
    const arraySorted = arrayUnsorted.sort(byBoolean({ desc: true }));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(false);

    expect(last).to.equal(true);

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});
