import "mocha";
import {getFirstAndLast, reverse} from "./utils/sort";
import {expectObjectToBeEquals} from "./utils/expectFns";
import {byNumber, byString, byValues} from "../src/index";

const arrayUnsorted = [
    {prop: "ccc", att: 0},
    {prop: "aaa", att: 5},
    {prop: "aaa", att: 2},
    {prop: "ccc", att: 3},
    {prop: "bbb", att: 3},
];

const correctArraySorted = [
    {prop: "aaa", att: 2},
    {prop: "aaa", att: 5},
    {prop: "bbb", att: 3},
    {prop: "ccc", att: 0},
    {prop: "ccc", att: 3},
];

describe("ByValues sorting, array option", () => {
    it("Does sort an array by multiple props", () => {
        const arraySorted = arrayUnsorted.sort(
            byValues([
                [(x) => x.prop, byString()],
                [(x) => x.att, byNumber()],
            ])
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "aaa", att: 2});

        expectObjectToBeEquals(last, {prop: "ccc", att: 3});

        expectObjectToBeEquals(arraySorted, correctArraySorted);
    });
});

describe("ByValues sorting desc, array option", () => {
    it("Does sort an array by multiple props", () => {
        const arraySorted = arrayUnsorted.sort(
            byValues([
                [(x) => x.prop, byString({desc: true})],
                [(x) => x.att, byNumber({desc: true})],
            ])
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(last, {prop: "aaa", att: 2});

        expectObjectToBeEquals(first, {prop: "ccc", att: 3});

        expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
    });
});

describe("ByValues sorting, array option", () => {
    it("Does sort an array by multiple props", () => {
        const currentUnsorted = [
            {prop: "ccc", att: 0},
            {prop: "aaa", att: 5},
            {prop: "aaa", att: 2},
            {prop: "ccc", att: 3},
            {prop: "ccc", att: 3},
            {prop: "bbb", att: 3},
        ];

        const currentArraySorted = [
            {prop: "aaa", att: 2},
            {prop: "aaa", att: 5},
            {prop: "bbb", att: 3},
            {prop: "ccc", att: 0},
            {prop: "ccc", att: 3},
            {prop: "ccc", att: 3},
        ];

        const arraySorted = currentUnsorted.sort(
            byValues([
                [(x) => x.prop, byString()],
                [(x) => x.att, byNumber()],
            ])
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "aaa", att: 2});

        expectObjectToBeEquals(last, {prop: "ccc", att: 3});

        expectObjectToBeEquals(arraySorted, currentArraySorted);
    });
});

describe("ByValues sorting desc, array option", () => {
    it("Does sort an array by multiple props", () => {
        const arraySorted = arrayUnsorted.sort(
            byValues([
                [(x) => x.att, byNumber()],
                [(x) => x.prop, byString()],
            ])
        );

        const currentArraySorted = [
            {prop: "ccc", att: 0},
            {prop: "aaa", att: 2},
            {prop: "bbb", att: 3},
            {prop: "ccc", att: 3},
            {prop: "aaa", att: 5},
        ];

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "ccc", att: 0});

        expectObjectToBeEquals(last, {prop: "aaa", att: 5});

        expectObjectToBeEquals(arraySorted, currentArraySorted);
    });
});

describe("ByValues sorting desc, array option", () => {
    it("Does sort an array by multiple props", () => {
        const arraySorted = arrayUnsorted.sort(
            byValues([
                [(x) => x.att, byNumber()],
                [(x) => x.prop, byString({desc: true})],
            ])
        );

        const currentArraySorted = [
            {prop: "ccc", att: 0},
            {prop: "aaa", att: 2},
            {prop: "ccc", att: 3},
            {prop: "bbb", att: 3},
            {prop: "aaa", att: 5},
        ];

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "ccc", att: 0});

        expectObjectToBeEquals(last, {prop: "aaa", att: 5});

        expectObjectToBeEquals(arraySorted, currentArraySorted);
    });
});

describe("ByValues sorting desc, array option", () => {
    it("Does sort an array by multiple props", () => {
        const arraySorted = arrayUnsorted.sort(
            byValues([
                [(x) => x.att, byNumber()],
                [(x) => x.prop, byString()],
            ])
        );

        const currentArraySorted = [
            {prop: "ccc", att: 0},
            {prop: "aaa", att: 2},
            {prop: "bbb", att: 3},
            {prop: "ccc", att: 3},
            {prop: "aaa", att: 5},
        ];

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first.prop, "ccc");

        expectObjectToBeEquals(last.prop, "aaa");

        expectObjectToBeEquals(
            arraySorted.map((a) => a.prop),
            currentArraySorted.map((a) => a.prop)
        );
    });
});

describe("ByValues sorting, array method option", () => {
    it("Does sort an array by multiple props", () => {
        const currentUnsorted = [
            {prop: "ccc", 1: 0},
            {prop: "aaa", 1: 5},
            {prop: "aaa", 1: 2},
            {prop: "ccc", 1: 3},
            {prop: "ccc", 1: 3},
            {prop: "bbb", 1: 3},
        ];

        const currentArraySorted = [
            {prop: "aaa", 1: 2},
            {prop: "aaa", 1: 5},
            {prop: "bbb", 1: 3},
            {prop: "ccc", 1: 0},
            {prop: "ccc", 1: 3},
            {prop: "ccc", 1: 3},
        ];

        const arraySorted = currentUnsorted.sort(
            byValues([
                [(x) => x.prop, byString()],
                [(x) => x[1], byNumber()],
            ])
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "aaa", 1: 2});

        expectObjectToBeEquals(last, {prop: "ccc", 1: 3});

        expectObjectToBeEquals(arraySorted, currentArraySorted);
    });
});


describe("ByValues sorting, nullable option", () => {
    it("Does sort an array by multiple props with nullable option", () => {
        const currentUnsorted = [
            {prop: "ccc", 1: 0},
            {prop: "aaa", 1: 5},
            {prop: "aaa", 1: 2},
            {prop: null, 1: null},
            {prop: "ccc", 1: 3},
            {prop: "ccc", 1: 3},
            {prop: "bbb", 1: 3},
        ];

        const currentArraySorted = [
            {prop: null, 1: null},
            {prop: "aaa", 1: 2},
            {prop: "aaa", 1: 5},
            {prop: "bbb", 1: 3},
            {prop: "ccc", 1: 0},
            {prop: "ccc", 1: 3},
            {prop: "ccc", 1: 3},
        ];

        const arraySorted = currentUnsorted.sort(
            byValues([
                [(x) => x.prop, byString({nullable: true})],
                [(x) => x[1], byNumber({nullable: true})],
            ])
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: null, 1: null});

        expectObjectToBeEquals(last, {prop: "ccc", 1: 3});

        expectObjectToBeEquals(arraySorted, currentArraySorted);
    });
});


describe("ByValues sorting, nullable and descending option", () => {
    it("Does sort an array by multiple props with nullable option", () => {
        const currentUnsorted = [
            {prop: "ccc", 1: 0},
            {prop: "aaa", 1: 2},
            {prop: "aaa", 1: 5},
            {prop: "ccc", 1: 3},
            {prop: null, 1: null},
            {prop: "ccc", 1: 3},
            {prop: "bbb", 1: 3},
        ];

        const currentArraySorted = [
            {prop: "ccc", 1: 3},
            {prop: "ccc", 1: 3},
            {prop: "ccc", 1: 0},
            {prop: "bbb", 1: 3},
            {prop: "aaa", 1: 5},
            {prop: "aaa", 1: 2},
            {prop: null, 1: null},
        ];

        const arraySorted = currentUnsorted.sort(
            byValues([
                [(x) => x.prop, byString({nullable: true, desc: true})],
                [(x) => x[1], byNumber({nullable: true, desc: true})],
            ])
        );

        const [first, last] = getFirstAndLast(arraySorted);

        expectObjectToBeEquals(first, {prop: "ccc", 1: 3});

        expectObjectToBeEquals(last, {prop: null, 1: null});

        expectObjectToBeEquals(arraySorted, currentArraySorted);
    });
});

