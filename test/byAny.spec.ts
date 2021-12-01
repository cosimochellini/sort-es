import "mocha";
import { expect } from "chai";
import { byAny } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import {
  expectDateToBeEquals,
  expectObjectToBeEquals,
} from "./utils/expectFns";

const date = (y: number, m: number, d: number) => new Date(y, m, d);

const arrayUnsortedOfNumber = [44, 12, 34, 124, 21.5];
const correctArraySortedOfNumber = [12, 21.5, 34, 44, 124];

const arrayUnsortedOfString = ["xxx", "bbb", "zzz", "cccc", "aaa"];
const correctArraySortedOfString = ["aaa", "bbb", "cccc", "xxx", "zzz"];

const arrayUnsortedOfDates = [
  date(2018, 1, 4),
  date(2018, 1, 2),
  date(2018, 1, 1),
  date(2018, 1, 3),
];

const arraySortedOfDates = [
  date(2018, 1, 1),
  date(2018, 1, 2),
  date(2018, 1, 3),
  date(2018, 1, 4),
];

const unsortedArrayOfMixed = ["", 1, date(2018, 1, 4)];

describe("ByAny sorting a list of number", function () {
  it("Does sort an array by number", function () {
    const arraySorted = arrayUnsortedOfNumber.sort(byAny());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(12);

    expect(last).to.equal(124);

    expectObjectToBeEquals(arraySorted, correctArraySortedOfNumber);
  });
});

describe("ByAny sorting desc", function () {
  it("Does sort an array by number descending", function () {
    const arraySorted = arrayUnsortedOfNumber.sort(byAny({ desc: true }));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(124);

    expect(last).to.equal(12);

    expectObjectToBeEquals(arraySorted, reverse(correctArraySortedOfNumber));
  });
});

describe("ByString sorting", function () {
  it("Does sort an array by string", function () {
    const arraySorted = arrayUnsortedOfString.sort(byAny());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal("aaa");

    expect(last).to.equal("zzz");

    expectObjectToBeEquals(arraySorted, correctArraySortedOfString);
  });
});

describe("ByString sorting desc", function () {
  it("Does sort an array by string descending", function () {
    const arraySorted = arrayUnsortedOfString.sort(byAny({ desc: true }));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(last).to.equal("aaa");

    expect(first).to.equal("zzz");

    expectObjectToBeEquals(arraySorted, reverse(correctArraySortedOfString));
  });
});

describe("ByDate sorting", function () {
  it("Does sort an array by date", function () {
    const arraySorted = arrayUnsortedOfDates.sort(byAny());

    const [first, last] = getFirstAndLast(arraySorted);

    expectDateToBeEquals(first, date(2018, 1, 1));

    expectDateToBeEquals(last, date(2018, 1, 4));

    expectObjectToBeEquals(arraySorted, arraySortedOfDates);
  });
});

describe("ByDate sorting desc", function () {
  it("Does sort an array by date descending", function () {
    const arraySorted = arrayUnsortedOfDates.sort(byAny({ desc: true }));

    const [first, last] = getFirstAndLast(arraySorted);

    expectDateToBeEquals(first, date(2018, 1, 4));

    expectDateToBeEquals(last, date(2018, 1, 1));

    expectObjectToBeEquals(arraySorted, reverse(arraySortedOfDates));
  });
});

describe("ByAny throw an error", function () {
  it("Does throw an error", function () {
    expect(() => unsortedArrayOfMixed.sort(byAny())).to.throw(
      "incorrect types of the 2 parameters"
    );
  });
});
