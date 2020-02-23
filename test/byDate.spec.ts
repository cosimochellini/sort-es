import 'mocha';
import { expect } from 'chai';
import { addDays } from 'date-fns'
import { byDate } from "../src/index";
import { getFirstAndLast, reverse } from './utils/sort';
import { expectArrayToBeEquals, expectDateToBeEquals, expectDatableToBeEquals } from './utils/expectFns';

const today = new Date();
const tomorrow = addDays(today, 1);
const yesterday = addDays(today, -1);

const arrayUnsorted = [tomorrow, today, yesterday];
const arrayUnsortedTimespan = arrayUnsorted.map(d => d.getTime());
// const arrayUnsortedString = arrayUnsorted.map(d => d.toString());

const correctArraySorted = [yesterday, today, tomorrow];

describe("ByDate sorting", function () {
    it("Does sort an array by date", function () {

        const arraySorted = arrayUnsorted.sort(byDate());

        const [first, last] = getFirstAndLast(arraySorted);

        expect(first).to.equal(yesterday);

        expect(last).to.equal(tomorrow);

        expectArrayToBeEquals(arraySorted, correctArraySorted);

    });
});

describe("ByDate sorting desc", function () {
    it("Does sort an array by date descending", function () {

        const arraySorted = arrayUnsorted.sort(byDate({ desc: true }));

        const [first, last] = getFirstAndLast(arraySorted);

        expect(first).to.equal(tomorrow);

        expect(last).to.equal(yesterday);

        expectArrayToBeEquals(arraySorted, reverse(correctArraySorted));

    });
});

describe("ByDate sorting desc", function () {
    it("Does sort an array by date as number", function () {

        const arraySorted = arrayUnsortedTimespan.sort(byDate());

        const [first, last] = getFirstAndLast(arraySorted);

        expectDateToBeEquals(first, yesterday);

        expectDateToBeEquals(last, tomorrow);

        expectDatableToBeEquals(arraySorted, correctArraySorted);

    });
});
