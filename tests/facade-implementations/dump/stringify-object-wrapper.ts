import { implementations } from "@";

const { stringifyObjectWrapper } = implementations.dump;

test("stringifyObjectWrapper", () => {
  expect(stringifyObjectWrapper({ x: 1 })).toBe('{"x":1}');
});
