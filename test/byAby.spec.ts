import "mocha";
import { expect } from "chai";
import { byAny } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";

const arrayUnsortedOfNumber = [44, 12, 34, 124, 21.5];
const correctArraySortedOfNumber = [12, 21.5, 34, 44, 124];
const arrayUnsortedOfString = ["xxx", "bbb", "zzz", "cccc", "aaa"];
const correctArraySortedOfString = ["aaa", "bbb", "cccc", "xxx", "zzz"];

describe("ByAny sorting a list of number", () => {
    it("Does sort an array by number", () => {
        const arraySorted = arrayUnsortedOfNumber.sort(byAny());

        const [first, last] = getFirstAndLast(arraySorted);

        expect(first).to.equal(12);

        expect(last).to.equal(124);

        expectObjectToBeEquals(arraySorted, correctArraySortedOfNumber);
    });
});

describe("ByAny sorting desc", () => {
    it("Does sort an array by number descending", () => {
        const arraySorted = arrayUnsortedOfNumber.sort(byAny({ desc: true }));

        const [first, last] = getFirstAndLast(arraySorted);

        expect(first).to.equal(124);

        expect(last).to.equal(12);

        expectObjectToBeEquals(arraySorted, reverse(correctArraySortedOfNumber));
    });
});



describe("ByString sorting", () => {
    it("Does sort an array by string", () => {
        const arraySorted = arrayUnsortedOfString.sort(byAny());

        const [first, last] = getFirstAndLast(arraySorted);

        expect(first).to.equal("aaa");

        expect(last).to.equal("zzz");

        expectObjectToBeEquals(arraySorted, correctArraySortedOfString);
    });
});

describe("ByString sorting desc", () => {
    it("Does sort an array by string descending", () => {
        const arraySorted = arrayUnsortedOfString.sort(byAny({ desc: true }));

        const [first, last] = getFirstAndLast(arraySorted);

        expect(last).to.equal("aaa");

        expect(first).to.equal("zzz");

        expectObjectToBeEquals(arraySorted, reverse(correctArraySortedOfString));
    });
});
