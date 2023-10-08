import "mocha";
import { expect } from "chai";
import { isSameDay } from "date-fns";
import { withoutTime } from "./date";
import { datable } from "../../src/types/types";

const expectObjectToBeEquals = <T>(item1: T, item2: T): void => {
    expect(JSON.stringify(item1)).to.be.equal(JSON.stringify(item2));
};


const expectDateToBeEquals = (date1: datable | null | undefined, date2: datable | null | undefined): void => {
    expect(isSameDay(new Date(date1 ?? 0), new Date(date2 ?? 0))).to.be.equal(true);
};

const expectDatableToBeEquals = (
    array1: (datable | undefined | null)[],
    array2: (datable | undefined | null)[]
): void => {
    const parsedArray1 = array1.map((d) => withoutTime(new Date(d??'')));

    const parsedArray2 = array2.map((d) => withoutTime(new Date(d??'')));

    expectObjectToBeEquals(parsedArray1, parsedArray2);
};

// Doesn't handle objects, but handles infinities and NaN better than
// `expectObjectToBeEquals`.
const expectStringToBeEquals = (data1: unknown, data2: unknown): void => {
  expect(String(data1)).to.be.equal(String(data2));
};

// TODO
export const expectLessThan = <T>(item1: T, item2: T, cmp: (item1: T, item2: T) => number) => {
  expect(cmp(item1, item2)).to.be.lessThan(0);
  expect(cmp(item2, item1)).to.be.greaterThan(0);
}

export {
    expectObjectToBeEquals,
    expectDateToBeEquals,
    expectDatableToBeEquals,
};
