import { byString } from "../../../src";

describe("My First Test", function() {
  it("Does not do much!", function() {
    expect(true).to.equal(true);
  });
});

describe("My First sort", function() {
  it("Does sort an array", function() {
    const arrayUnsorted = ["xxx", "bbbb", "zzz", "cccc", "aaa"];

    const arraySorted = arrayUnsorted.sort(byString());
    const { 0: first, [arraySorted.length - 1]: last } = arraySorted;
    expect(first).to.equal("aaa");
    expect(last).to.equal("zzz");
  });
});
