import "mocha";
import {expect} from "chai";
import {byDate} from "../src/index";
import {addDays, parseISO} from "date-fns";
import {getFirstAndLast, reverse} from "./utils/sort";

import {
  expectObjectToBeEquals,
  expectDateToBeEquals,
  expectDatableToBeEquals
} from "./utils/expectFns";

const today = new Date();
const tomorrow = addDays(today, 1);
const yesterday = addDays(today, -1);

const arrayUnsorted = [tomorrow, today, yesterday];
const arrayUnsortedTimespan = arrayUnsorted.map(d => d.getTime());
const arrayUnsortedString = arrayUnsorted.map(d => d.toString());

const correctArraySorted = [yesterday, today, tomorrow];

describe("ByDate sorting", () => {
  it("Does sort an array by date", () => {
    const arraySorted = arrayUnsorted.sort(byDate());

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(yesterday);

    expect(last).to.equal(tomorrow);

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByDate sorting desc", () => {
  it("Does sort an array by date descending", () => {
    const arraySorted = arrayUnsorted.sort(byDate({desc: true}));

    const [first, last] = getFirstAndLast(arraySorted);

    expect(first).to.equal(tomorrow);

    expect(last).to.equal(yesterday);

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});

describe("ByDate sorting desc", () => {
  it("Does sort an array by date as number", () => {
    const arraySorted = arrayUnsortedTimespan.sort(byDate());

    const [first, last] = getFirstAndLast(arraySorted);

    expectDateToBeEquals(first, yesterday);

    expectDateToBeEquals(last, tomorrow);

    expectDatableToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByDate sorting desc", () => {
  it("Does sort an array by date as string", () => {
    const arraySorted = arrayUnsortedString.sort(byDate());

    const [first, last] = getFirstAndLast(arraySorted);

    expectDateToBeEquals(first, yesterday);

    expectDateToBeEquals(last, tomorrow);

    expectDatableToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByDate sorting using custom parser", () => {
  it("Does sort an array by date as number", () => {
    const arraySorted = arrayUnsortedString.sort(
      byDate({
        customParser: item => parseISO(item.toString())
      })
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectDateToBeEquals(first, yesterday);

    expectDateToBeEquals(last, tomorrow);

    expectDatableToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByDate sorting with nullables", () => {
  it("Does sort an array by date with nullables", () => {
    const arrayWithNullables = [
      null,
      ...arrayUnsorted,
      null,
    ]

    const correctArraySortedWithNullables = [
      null,
      null,
      ...correctArraySorted,
    ]

    const arraySorted = arrayWithNullables.sort(
      byDate({nullable: true})
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectDateToBeEquals(first, null);

    expectDateToBeEquals(last, tomorrow);

    expectDatableToBeEquals(arraySorted, correctArraySortedWithNullables);
  });
});

