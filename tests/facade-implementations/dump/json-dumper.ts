import { implementations } from "@";

const { jsonDumper } = implementations.dump;

test("jsonDumper", () => {
  expect(jsonDumper({ x: 1 })).toBe('{"x":1}');
});
