import "mocha";
import { asyncGenerator } from "./utils/async";
import { getFirstAndLast, reverse } from "./utils/sort";
import { expectObjectToBeEquals } from "./utils/expectFns";
import { byNumber, byValue, AsyncArray, sortAsync } from "../src/index";

const unsortedArray = [{ id: 4 }, { id: 6 }, { id: 1 }, { id: 7 }, { id: 0 }];
const unsortedAsyncArray = unsortedArray.map(asyncGenerator);

const sortedArray = [{ id: 0 }, { id: 1 }, { id: 4 }, { id: 6 }, { id: 7 }];

const test = async (): Promise<void> => {
  describe("ByAsyncValue sorting", () => {
    it("Does sort an array by any promise", async () => {
      const asyncArrayHandler = new AsyncArray(unsortedAsyncArray);

      const arraySorted = await asyncArrayHandler.sortAsync(
        byValue(x => x.id, byNumber())
      );

      const [first, last] = getFirstAndLast(arraySorted);

      expectObjectToBeEquals(first, { id: 0 });
      expectObjectToBeEquals(last, { id: 7 });
      expectObjectToBeEquals(arraySorted, sortedArray);
    });
  });

  describe("ByString sorting desc", () => {
    it("Does sort an array by string descending", async () => {
      const arraySorted = await sortAsync(
        unsortedAsyncArray,
        byValue("id", byNumber())
      );

      const [first, last] = getFirstAndLast(arraySorted);

      expectObjectToBeEquals(first, { id: 0 });
      expectObjectToBeEquals(last, { id: 7 });
      expectObjectToBeEquals(arraySorted, sortedArray);
    });
  });

  describe("ByAsyncValue sorting", () => {
    it("Does sort an array by any promise", async () => {
      const asyncArrayHandler = new AsyncArray(unsortedAsyncArray);

      const arraySorted = await asyncArrayHandler.sortAsync(
        byValue(x => x.id, byNumber({ desc: true }))
      );

      const [first, last] = getFirstAndLast(arraySorted);

      expectObjectToBeEquals(first, { id: 7 });
      expectObjectToBeEquals(last, { id: 0 });
      expectObjectToBeEquals(arraySorted, reverse(sortedArray));
    });
  });

  describe("ByString sorting desc", () => {
    it("Does sort an array by string descending", async () => {
      const arraySorted = await sortAsync(
        unsortedAsyncArray,
        byValue("id", byNumber({ desc: true }))
      );

      const [first, last] = getFirstAndLast(arraySorted);

      expectObjectToBeEquals(first, { id: 7 });
      expectObjectToBeEquals(last, { id: 0 });
      expectObjectToBeEquals(arraySorted, reverse(sortedArray));
    });
  });
};

test();
