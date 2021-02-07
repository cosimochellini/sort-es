import "mocha";
import { byNumber, byString, byValues } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";

const arrayUnsorted = [
  { prop: "ccc", att: 0 },
  { prop: "aaa", att: 5 },
  { prop: "aaa", att: 2 },
  { prop: "ccc", att: 3 },
  { prop: "bbb", att: 3 },
];

const correctArraySorted = [
  { prop: "aaa", att: 2 },
  { prop: "aaa", att: 5 },
  { prop: "bbb", att: 3 },
  { prop: "ccc", att: 0 },
  { prop: "ccc", att: 3 },
];

describe("ByValues sorting", () => {
  it("Does sort an array by multiple props", () => {
    const arraySorted = arrayUnsorted.sort(
      byValues({ prop: byString(), att: byNumber() })
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first, { prop: "aaa", att: 2 });

    expectObjectToBeEquals(last, { prop: "ccc", att: 3 });

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByValues sorting desc", () => {
  it("Does sort an array by multiple props", () => {
    const arraySorted = arrayUnsorted.sort(
      byValues({
        prop: byString({ desc: true }),
        att: byNumber({ desc: true }),
      })
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(last, { prop: "aaa", att: 2 });

    expectObjectToBeEquals(first, { prop: "ccc", att: 3 });

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});

describe("ByValues sorting", () => {
  it("Does sort an array by multiple props", () => {
    const currentUnsorted = [
      { prop: "ccc", att: 0 },
      { prop: "aaa", att: 5 },
      { prop: "aaa", att: 2 },
      { prop: "ccc", att: 3 },
      { prop: "ccc", att: 3 },
      { prop: "bbb", att: 3 },
    ];

    const currentArraySorted = [
      { prop: "aaa", att: 2 },
      { prop: "aaa", att: 5 },
      { prop: "bbb", att: 3 },
      { prop: "ccc", att: 0 },
      { prop: "ccc", att: 3 },
      { prop: "ccc", att: 3 },
    ];
    const arraySorted = currentUnsorted.sort(
      byValues({ prop: byString(), att: byNumber() })
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first, { prop: "aaa", att: 2 });

    expectObjectToBeEquals(last, { prop: "ccc", att: 3 });

    expectObjectToBeEquals(arraySorted, currentArraySorted);
  });
});

describe("ByValues sorting desc", () => {
  it("Does sort an array by multiple props", () => {
    const arraySorted = arrayUnsorted.sort(
      byValues({
        att: byNumber(),
        prop: byString(),
      })
    );
    const currentArraySorted = [
      { prop: "ccc", att: 0 },
      { prop: "aaa", att: 2 },
      { prop: "bbb", att: 3 },
      { prop: "ccc", att: 3 },
      { prop: "aaa", att: 5 },
    ];

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first, { prop: "ccc", att: 0 });

    expectObjectToBeEquals(last, { prop: "aaa", att: 5 });

    expectObjectToBeEquals(arraySorted, currentArraySorted);
  });
});

describe("ByValues sorting desc", () => {
  it("Does sort an array by multiple props", () => {
    const arraySorted = arrayUnsorted.sort(
      byValues({
        att: byNumber(),
        prop: byString({ desc: true }),
      })
    );

    const currentArraySorted = [
      { prop: "ccc", att: 0 },
      { prop: "aaa", att: 2 },
      { prop: "ccc", att: 3 },
      { prop: "bbb", att: 3 },
      { prop: "aaa", att: 5 },
    ];

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first, { prop: "ccc", att: 0 });

    expectObjectToBeEquals(last, { prop: "aaa", att: 5 });

    expectObjectToBeEquals(arraySorted, currentArraySorted);
  });
});

describe("ByValues sorting desc", () => {
  it("Does sort an array by multiple props", () => {
    const arraySorted = arrayUnsorted.sort(
      byValues({
        att: undefined,
        prop: byString(),
      })
    );

    const currentArraySorted = [
      { prop: "aaa", att: 5 },
      { prop: "aaa", att: 2 },
      { prop: "bbb", att: 3 },
      { prop: "ccc", att: 3 },
      { prop: "ccc", att: 0 },
    ];

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first.prop, "aaa");

    expectObjectToBeEquals(last.prop, "ccc");

    expectObjectToBeEquals(
      arraySorted.map((a) => a.prop),
      currentArraySorted.map((a) => a.prop)
    );
  });
});

describe("ByValues sorting desc", () => {
  it("Does sort an array by multiple props", () => {
    const currentArrayUnsorted: { prop: string; att: number }[] = [
      { prop: "bbb", att: 3 },
      { prop: null, att: 3 },
      { prop: "ccc", att: 0 },
      { prop: "aaa", att: 2 },
      { prop: "aaa", att: undefined },
    ];

    const currentArraySorted = [
      { prop: "aaa", att: undefined },
      { prop: "ccc", att: 0 },
      { prop: "aaa", att: 2 },
      { prop: null, att: 3 },
      { prop: "bbb", att: 3 },
    ];

    const arraySorted = currentArrayUnsorted.sort(
      byValues({
        att: byNumber({ nullable: true }),
        prop: byString({ nullable: true }),
      })
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first.prop, "aaa");

    expectObjectToBeEquals(last.att, 3);

    expectObjectToBeEquals(arraySorted, currentArraySorted);
  });
});

describe("ByValues sorting, array method option", () => {
  it("Does sort an array by multiple props", () => {
    const currentUnsorted = [
      { prop: "ccc", 1: 0 },
      { prop: "aaa", 1: 5 },
      { prop: "aaa", 1: 2 },
      { prop: "ccc", 1: 3 },
      { prop: "ccc", 1: 3 },
      { prop: "bbb", 1: 3 },
    ];

    const currentArraySorted = [
      { prop: "aaa", 1: 2 },
      { prop: "aaa", 1: 5 },
      { prop: "bbb", 1: 3 },
      { prop: "ccc", 1: 0 },
      { prop: "ccc", 1: 3 },
      { prop: "ccc", 1: 3 },
    ];
    const arraySorted = currentUnsorted.sort(
      byValues([
        ["prop", byString()],
        [1, byNumber()],
      ])
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first, { prop: "aaa", 1: 2 });

    expectObjectToBeEquals(last, { prop: "ccc", 1: 3 });

    expectObjectToBeEquals(arraySorted, currentArraySorted);
  });
});
