import { implementations } from "@";

const compare = implementations.compare.naturalCompareWrapper;

test("implementation", () => {
  expect(compare(2, 1)).toBe(1);
  expect(compare(1, 2)).toStrictEqual(-1);
  expect(compare(1, 1)).toBe(0);
});

test("implementation.strings", () => {
  expect(compare.strings("b", "a")).toBe(1);
  expect(compare.strings("a", "b")).toStrictEqual(-1);
  expect(compare.strings("a", "a")).toBe(0);
  expect(compare.strings("10", "2")).toBe(1);
  expect(compare.strings("2", "10")).toStrictEqual(-1);
});
