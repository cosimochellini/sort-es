import 'mocha';
import { expect } from 'chai';
import { byString } from "../index";
import { getFirstAndLast } from './utils/sort';

describe("ByString sorting", function () {
    it("Does sort an array by string", function () {
        const arrayUnsorted = ["xxx", "bbbb", "zzz", "cccc", "aaa"];

        const arraySorted = arrayUnsorted.sort(byString());

        const [first, last] = getFirstAndLast(arraySorted);

        expect(first).to.equal("aaa");

        expect(last).to.equal("zzz");

    });
});


describe("ByString sorting desc", function () {
    it("Does sort an array by string descending", function () {
        const arrayUnsorted = ["xxx", "bbbb", "zzz", "cccc", "aaa"];

        const arraySorted = arrayUnsorted.sort(byString({ desc: true }));

        const [first, last] = getFirstAndLast(arraySorted);

        expect(last).to.equal("aaa");

        expect(first).to.equal("zzz");

    });
});
