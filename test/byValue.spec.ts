import "mocha";
import { byValue, byString } from "../src/index";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";

const arrayUnsorted = [
  { prop: "xxx" },
  { prop: "aaa" },
  { prop: "zzz" },
  { prop: "ccc" },
  { prop: "bbb" }
];

const correctArraySorted = [
  { prop: "aaa" },
  { prop: "bbb" },
  { prop: "ccc" },
  { prop: "xxx" },
  { prop: "zzz" }
];

describe("ByString sorting", function() {
  it("Does sort an array by string", function() {
    const arraySorted = arrayUnsorted.sort(byValue(x => x.prop, byString()));

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first, { prop: "aaa" });

    expectObjectToBeEquals(last, { prop: "zzz" });

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});

describe("ByString sorting desc", function() {
  it("Does sort an array by string descending", function() {
    const arraySorted = arrayUnsorted.sort(
      byValue(x => x.prop, byString({ desc: true }))
    );

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(last, { prop: "aaa" });

    expectObjectToBeEquals(first, { prop: "zzz" });

    expectObjectToBeEquals(arraySorted, reverse(correctArraySorted));
  });
});

describe("ByString sorting", function() {
  it("Does sort an array by string", function() {
    const arraySorted = arrayUnsorted.sort(byValue("prop", byString()));

    const [first, last] = getFirstAndLast(arraySorted);

    expectObjectToBeEquals(first, { prop: "aaa" });

    expectObjectToBeEquals(last, { prop: "zzz" });

    expectObjectToBeEquals(arraySorted, correctArraySorted);
  });
});
