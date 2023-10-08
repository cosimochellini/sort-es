import "mocha";
import {expect} from "chai";
import {isSameDay} from "date-fns";
import {withoutTime} from "./date";
import {datable} from "../../src/types/types";

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

export {
    expectObjectToBeEquals,
    expectDateToBeEquals,
    expectDatableToBeEquals,
};
