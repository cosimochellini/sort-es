import "mocha";
import {byValue, byString} from "../src/index";
import {getFirstAndLast, reverse} from "./utils/sort";
import {expectObjectToBeEquals} from "./utils/expectFns";

const arrayUnsorted = [
    {prop: "xxx"},
    {prop: "aaa"},
    {prop: "zzz"},
    {prop: "ccc"},
    {prop: "bbb"}
];

const correctArraySorted = [
    {prop: "aaa"},
    {prop: "bbb"},
    {prop: "ccc"},
    {prop: "xxx"},
    {prop: "zzz"}
];

describe("ByString sorting", () => {
    it("Does sort an array by string", () => {
        const arraySorted = arrayUnsorted.sort(byValue(x => x.prop, byString()));

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "aaa"});

        expectObjectToBeEquals(last, {prop: "zzz"});

        expectObjectToBeEquals(arraySorted, correctArraySorted);
    });
});

describe("ByString sorting desc", () => {
    it("Does sort an array by string descending", () => {
        const arraySorted = arrayUnsorted.sort(
            byValue(x => x.prop, byString({desc: true}))
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(last, {prop: "aaa"});

        expectObjectToBeEquals(first, {prop: "zzz"});

        expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
    });
});

describe("ByString sorting", () => {
    it("Does sort an array by string", () => {
        const arraySorted = arrayUnsorted.sort(byValue("prop", byString()));

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "aaa"});

        expectObjectToBeEquals(last, {prop: "zzz"});

        expectObjectToBeEquals(arraySorted, correctArraySorted);
    });
});


describe("ByString sorting, with nullables", () => {
    it("Does sort an array by string", () => {
        const nullableArrayUnsorted = [
            ...arrayUnsorted,
            {prop: null}
        ]
        const correctNullableArraySorted = [
            {prop: null},
            ...arrayUnsorted,
        ]

        const arraySorted = nullableArrayUnsorted.sort(
            byValue(x => x.prop, byString({nullable: true}))
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: null});

        expectObjectToBeEquals(last, {prop: "zzz"});

        expectObjectToBeEquals(arraySorted, correctNullableArraySorted);
    });
});
