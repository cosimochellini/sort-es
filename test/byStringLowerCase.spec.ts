import "mocha";
import { expect } from "chai";
import { byString } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";

const arrayUnsorted = ["AAA", "aaB", "ccA", "cccc", "aAc"];
const correctArraySorted = ["AAA", "aaB", "aAc", "ccA", "cccc"];

describe("ByStringLowerCase sorting", () => {
  it("Does sort an array by string in lowercase", () => {
    const arraySorted = arrayUnsorted.sort(byString({ lowercase: true }));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal("AAA");

    expect(last).to.equal("cccc");

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByString sorting desc", () => {
  it("Does sort an array by string descending in lowercase", () => {
    const arraySorted = arrayUnsorted.sort(
      byString({ lowercase: true, desc: true })
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expect(last).to.equal("AAA");

    expect(first).to.equal("cccc");

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});
