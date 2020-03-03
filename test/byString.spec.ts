import "mocha";
import { expect } from "chai";
import { byString } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";

const arrayUnsorted = ["xxx", "bbb", "zzz", "cccc", "aaa"];
const correctArraySorted = ["aaa", "bbb", "cccc", "xxx", "zzz"];

describe("ByString sorting", () => {
  it("Does sort an array by string", () => {
    const arraySorted = arrayUnsorted.sort(byString());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal("aaa");

    expect(last).to.equal("zzz");

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByString sorting desc", () => {
  it("Does sort an array by string descending", () => {
    const arraySorted = arrayUnsorted.sort(byString({ desc: true }));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(last).to.equal("aaa");

    expect(first).to.equal("zzz");

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});
