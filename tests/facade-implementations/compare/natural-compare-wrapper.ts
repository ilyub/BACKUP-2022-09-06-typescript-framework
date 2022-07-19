import { implementations } from "@";

const compare = implementations.compare.naturalCompareWrapper;

test.each([
  { expected: 1, x: 2, y: 1 },
  { expected: -1, x: 1, y: 2 },
  { expected: 0, x: 1, y: 1 }
])("implementation", ({ expected, x, y }) => {
  expect(compare(x, y)).toBe(expected);
});

test.each([
  { expected: 1, x: "b", y: "a" },
  { expected: -1, x: "a", y: "b" },
  { expected: 0, x: "a", y: "a" },
  { expected: 1, x: "10", y: "2" },
  { expected: -1, x: "2", y: "10" }
])("implementation.strings", ({ expected, x, y }) => {
  expect(compare.strings(x, y)).toBe(expected);
});
