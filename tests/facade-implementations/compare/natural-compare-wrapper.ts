import * as naturalCompareWrapper from "@/facade-implementations/compare/natural-compare-wrapper";

it("implementation", () => {
  const compare = naturalCompareWrapper.implementation;

  expect(compare(2, 1)).toStrictEqual(1);
  expect(compare(1, 2)).toStrictEqual(-1);
  expect(compare(1, 1)).toStrictEqual(0);
});

it("implementation.strings", () => {
  const compare = naturalCompareWrapper.implementation.strings;

  expect(compare("b", "a")).toStrictEqual(1);
  expect(compare("a", "b")).toStrictEqual(-1);
  expect(compare("a", "a")).toStrictEqual(0);
  expect(compare("10", "2")).toStrictEqual(1);
  expect(compare("2", "10")).toStrictEqual(-1);
});
