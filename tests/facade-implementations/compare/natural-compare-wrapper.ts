import { implementations } from "@";

test("implementation", () => {
  const compare = implementations.compare.naturalCompare;

  expect(compare(2, 1)).toBe(1);
  expect(compare(1, 2)).toStrictEqual(-1);
  expect(compare(1, 1)).toBe(0);
});

test("implementation.strings", () => {
  const compare = implementations.compare.naturalCompare.strings;

  expect(compare("b", "a")).toBe(1);
  expect(compare("a", "b")).toStrictEqual(-1);
  expect(compare("a", "a")).toBe(0);
  expect(compare("10", "2")).toBe(1);
  expect(compare("2", "10")).toStrictEqual(-1);
});
